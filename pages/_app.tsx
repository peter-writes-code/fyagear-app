import "tailwindcss/tailwind.css";

import {AppProps} from 'next/app';
import React, {FC} from 'react';

const FyaGearApp: FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
);

export default FyaGearApp;
