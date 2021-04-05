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

    // the user is authenticated!
    const { uid } = token;
    // FETCH STUFF HERE!! 🚀

    return {
      props: { uid },
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
  const clientSideAuthenticated = !loading && user && user.uid ? true : false;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">welcome to fyagear!</h1>
        <div className="text-base py-6">
          soon the stream of gear will go here. until then please go ahead and
        </div>
        {!serverSideAuthenticated && (
          <Button
            label="LOGIN WITH GOOGLE"
            onClick={signinWithGoogle}
            visible={!loading}
          />
        )}
        {serverSideAuthenticated && (
          <span>
            <Link href="/submitGear">
              <a>
                <Button
                  label="SUBMIT GEAR!"
                  visible={!loading}
                />
              </a>
            </Link>
            <span className="ml-4">
              <Button
                label="LOGOUT"
                onClick={signout}
                visible={!loading}
              />
            </span>
          </span>
        )}
      </main>
      <ProgressIndicator visible={loading} />
    </div>
  );
};

export default Index;
