import firebaseClient from "./firebaseClient";
import nookies from "nookies";
import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
// import { createUser } from './db';

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
});

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = (): any => {
  return useContext(AuthContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    console.log("handleUser called", new Date());
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // createUser(user.uid, userWithoutToken);
      setUser(user);
      setLoading(false);
      nookies.set(undefined, "token", token, { path: "/" });
      if (Router.asPath === "/") {
        Router.push("/");
      }

      return user;
    } else {
      setUser(false);
      setLoading(false);
      nookies.set(undefined, "token", "", { path: "/" });
      return false;
    }
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.GoogleAuthProvider())
      .then(() => {
        Router.push("/");
      });
  };

  const signout = () => {
    return firebaseClient
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        Router.push("/");
      });
  };

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     if (user) {
  //       const token = await firebase
  //         .auth()
  //         .currentUser.getIdToken(/* forceRefresh */ true);
  //       setUser(user);
  //       console.log('refreshed token');
  //     }
  //   }, 30 * 60 * 1000 /*every 30min, assuming token expires every 1hr*/);
  //   return () => clearInterval(interval);
  // }, [user]); // needs to depend on user to have closure on a valid user object in callback fun

  const getFreshToken = async () => {
    // console.log("getFreshToken called", new Date());
    const currentUser = firebaseClient.auth().currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(false);
      return `${token}`;
    } else {
      return "";
    }
  };

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
    getFreshToken,
  };
}

// const getStripeRole = async () => {
//   await firebase.auth().currentUser.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
//   return decodedToken.claims.stripeRole || 'free';
// };

const formatUser = async (user) => {
  // const token = await user.getIdToken(/* forceRefresh */ true);
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
  const { token, expirationTime } = decodedToken;
  // console.log(token);
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  };
};
