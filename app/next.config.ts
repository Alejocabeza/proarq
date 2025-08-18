import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { loadEnvFile } from "process";

if (process.env.NODE_ENV === "development") {
  loadEnvFile("../../.env");
}

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
