import firebaseClient from "./firebaseClient";
import nookies, { parseCookies } from "nookies";
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
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token } = user;
      setUser(user);
      nookies.set(undefined, "token", token, { path: "/" });
  
      const profile = await getUserProfile(user.uid);
      setLoading(false);

      if (profile) {
        setUserProfile(profile);
        if (Router.asPath === "/") {
          Router.push("/");
        }
      } else {
        const cookies = parseCookies();
        if (cookies.signupAttempt) {
          Router.push("/signup");
        } else {
          setUser(false);
          signout();
        }
      }
      return user;
    } else {
      setLoading(false);
      setUser(false);
      nookies.set(undefined, "token", "", { path: "/" });
      return false;
    }
  };

  const signinWithGoogle = (redirect) => {
    setLoading(true);
    return firebaseClient
      .auth()
      .signInWithRedirect(new firebaseClient.auth.GoogleAuthProvider())
      .then(() => {});
  };

  const signupWithGoogle = () => {
    nookies.set(undefined, "signupAttempt", "true", { path: "/" });
    return signinWithGoogle("signup").then(() => {});
  };

  const createAccount = async () => {
    const firestore = firebaseClient.firestore();
    const userProfile = firestore.collection("userProfiles").doc(user.uid);
    await userProfile.set(user);
    nookies.set(undefined, "signupAttempt", "", { path: "/" });
    Router.push("/");
    return userProfile;
  };

  const signout = () => {
    nookies.set(undefined, "signupAttempt", "", { path: "/" });
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
    createAccount,
    user,
    loading,
    signinWithGoogle,
    signupWithGoogle,
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
  const decodedToken = await user.getIdTokenResult(false);
  const { token, expirationTime } = decodedToken;
  // console.log(token);
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    token,
    expirationTime,
    // stripeRole: await getStripeRole(),
  };
};

const getUserProfile = async (uid) => {
  const firestore = firebaseClient.firestore();
  const doc = await firestore.collection("userProfiles").doc(uid).get();
  const userProfile = doc.data();
  return userProfile;
};
