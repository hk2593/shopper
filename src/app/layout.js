'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/app_components/navbar";
import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';  
import { PersistGate } from 'redux-persist/integration/react';
import Footer from "@/components/app_components/Footer";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            {children}
            <Footer></Footer>
            </PersistGate>
      </Provider> 
      </body>
    </html>
  );
}

