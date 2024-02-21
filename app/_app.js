// app/_app.js

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store'; // Adjust this path to where your store is defined
import RootLayout from './layout'; // Adjust this path to your layout component
import './globals.css'; // Import global styles, adjust if necessary

function MyApp({ Component, pageProps }) {
    console.log("gdfsdfs")
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
