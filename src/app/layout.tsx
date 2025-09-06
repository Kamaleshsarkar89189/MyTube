import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
// import PushNotificationAd from "@/components/PushNotificationAd";
// import PopunderAd from "@/components/PopunderAd";
// import { InPagePushAd } from "@/components/InPagePushAd";
import { IndustrialAd } from "@/components/IndustrialAd";
import { VintageAd } from "@/components/VintageAd";
// import BottomNav from "@/components/BottonNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieHub",
  description: "MovieHub is your ultimate destination for discovering, streaming, and enjoying movies. Explore a wide range of genres, watch trailers, stay updated with the latest releases, and dive into the world of cinema — all in one place.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <ClerkProvider>
        <html lang="en" className="dark">
          <body
            className={inter.className}>
            <TRPCProvider>
              <Toaster />
              {/* <VintageAd/> */}
              {/* <IndustrialAd/> */}
              {/* <InPagePushAd/>
              <PopunderAd />
              <PushNotificationAd /> */}
              {children}
              {/* <BottomNav/> */}
            </TRPCProvider>
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
