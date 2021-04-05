import Link from "next/link";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import React from "react";

import AppHead from "../components/common/AppHead";
import Button from "../components/common/Button";
import { firebaseAdmin } from "../firebase/firebaseAdmin";
import ProgressIndicator from "../components/common/ProgressIndicator";
import { useAuth } from "../firebase/auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    return {
      props: {},
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return { props: {} as never };
  }
};

const Signup = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const title = "fyagear | create account";
  const { createAccount, user, loading, signinWithGoogle, signout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">create an account!</h1>
        <div className="flex flex-row mb-4">
          <div className="mt-4 w-20 h-20 bg-red-600 rounded-lg overflow-hidden border-2 border-gray-500">
            <img className="w-20 h-20" src={user ? user.photoURL : ""} />
          </div>
          <div>
            <div className="text-xl mt-3 ml-4 font-medium">
              {user ? user.displayName : ""}
            </div>
            <div className="text-base mt-1 ml-4">
              {user ? user.email : ""}
            </div>
          </div>
        </div>
        <Button label="SIGN UP" onClick={createAccount} visible={!loading} />
        <span className="ml-4">
          <Button label="CANCEL" onClick={signout} visible={!loading} />
        </span>
      </main>
      <ProgressIndicator visible={loading} />
    </div>
  );
};

export default Signup;
