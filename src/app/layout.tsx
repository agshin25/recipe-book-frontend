import React from "react";
import '@/styles/globals.css'
import { Navbar } from "@/components/ui/Navbar";
import { Providers } from "./provider";

export default function RootLayout({children}: {children: React.ReactNode}){
  return (
    <html lang="en">
        <body>
          <Providers>
              <Navbar />
              {children}
          </Providers>
        </body>
    </html>
  )
}