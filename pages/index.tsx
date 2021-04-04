import Link from "next/link";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import React from "react";

import AppHead from "../components/common/AppHead";
import { firebaseAdmin } from "../firebase/firebaseAdmin";
import { useAuth } from "../firebase/auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;
    // FETCH STUFF HERE!! 🚀

    return {
      props: { uid, email },
    };
  } catch (err) {
    return { props: {} as never };
  }
};

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const title = "fyagear | home";
  const { user, loading, signinWithGoogle, signout } = useAuth();
  const serverSideAuthenticated = props.uid ? true : false;
  const clientSideAuthenticated = !loading && user.uid ? true : false;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">welcome to fyagear!</h1>
        <div className="text-base py-6">
          soon the stream of gear will go here. until then please go ahead and
        </div>
        {loading && (
          <h1>
            authenticating...
          </h1>
        )}
        {serverSideAuthenticated && (
          <Link href="/submitGear">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              SUBMIT GEAR!
            </button>
          </Link>
        )}
        {serverSideAuthenticated && (
          <button
            className="ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={signout}
          >
            LOGOUT
          </button>
        )}
        {!serverSideAuthenticated && !loading && (
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={signinWithGoogle}
          >
            LOGIN WITH GOOGLE
          </button>
        )}
        <div className="mt-6">serverSideAuthenticated: {serverSideAuthenticated.toString()}</div>
        <div>clientSideAuthenticated: {clientSideAuthenticated.toString()}</div>
        <div>loading: {loading.toString()}</div>
      </main>
    </div>
  );
};

export default Index;
