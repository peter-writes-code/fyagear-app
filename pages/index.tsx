import Link from "next/link";
import React from "react";
import { useEffect } from "react";

import AppHead from "../components/common/AppHead";
import { useAuth } from "../firebase/auth";

const Index = () => {
  const title = "fyagear | home";
  const { user, loading, signinWithGoogle, signout } = useAuth();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">welcome to fyagear!</h1>
        <div className="text-base py-6">
          soon the stream of gear will go here. until then please go ahead and
        </div>
        {!loading && user && user.uid && (
          <Link href="/submitGear">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              SUBMIT GEAR!
            </button>
          </Link>
        )}
        {!loading && user && user.uid && (
          <button className="ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={signout}
          >
            LOGOUT
          </button>
      )}
        {!loading && !user && (
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={signinWithGoogle}
          >
            LOGIN WITH GOOGLE
          </button>
        )}
      </main>
    </div>
  );
};

export default Index;
