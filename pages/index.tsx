import Link from "next/link";
import React from "react";
import { useEffect } from "react";

import AppHead from "../components/common/AppHead";

const Index = () => {
  const title = "fyagear | home";

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-200 to-white select-none">
      <AppHead title={title} />

      <main className="flex-grow p-8 container mx-auto">
        <h1 className="text-5xl font-medium text-black">welcome to fyagear!</h1>
        <div className="text-base py-6">
          soon the stream of gear will go here. until then please go ahead and
        </div>
        <Link href="/submitGear">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            SUBMIT GEAR!
          </button>
        </Link>
      </main>
    </div>
  );
};

export default Index;
