import "tailwindcss/tailwind.css";

import { AppProps } from "next/app";
import { AuthProvider } from "../firebase/auth";
import React, { FC } from "react";

const FyaGearApp: FC<AppProps> = ({ Component, pageProps }) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default FyaGearApp;
