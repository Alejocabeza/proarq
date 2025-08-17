"use client";
import { NextIntlClientProvider, AbstractIntlMessages } from "next-intl";
import { PropsWithChildren } from "react";

export function IntlProviderWrapper({ messages, children }: PropsWithChildren & { messages: AbstractIntlMessages }) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}