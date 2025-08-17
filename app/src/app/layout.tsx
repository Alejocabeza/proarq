import type { Metadata } from "next";
import "@app/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { StoreProvider } from "@app/providers/store.provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="es">
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
