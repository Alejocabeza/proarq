import type { Metadata } from "next";
import "@app/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { StoreProvider } from "@app/providers/store.provider";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <StoreProvider>
              {children}
              <Toaster richColors position="top-center" duration={3000} />
            </StoreProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
