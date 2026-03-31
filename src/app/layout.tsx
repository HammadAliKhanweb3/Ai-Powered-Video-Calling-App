import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import {NuqsAdapter} from "nuqs/adapters/next"
import "@stream-io/video-react-sdk/dist/css/styles.css";

export const metadata: Metadata = {
  title: "Agent Meet",
  description: "A video conferencing app to connect with Ai agents and with ai assistance.  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
  <TRPCReactProvider>
     <html lang="en">
      <body
        className="font-sans antialiased"
      >
        <Toaster/>
        {children}
      </body>
    </html>
   </TRPCReactProvider>
    </NuqsAdapter>
 
  );
}
