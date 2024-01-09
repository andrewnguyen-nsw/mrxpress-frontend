import "@styles/globals.css";

import { Providers } from "./providers";
import React from "react";
import Nav from "@components/Nav";
import Footer from "@components/Footer";


export const metadata = {
  title: "MrXpress",
  description: "Mobile Phone Repair Sydney",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='light'>
      <body>
        <Providers>
          <div className="site-wrapper">
            <Nav />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}