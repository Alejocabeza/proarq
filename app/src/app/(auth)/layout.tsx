import Link from "next/link";
import Image from "next/image";
import { PropsWithChildren } from "react";

const GuestLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-stack-2 bg-black text-white rounded p-1"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
              <path d="M4 12l8 4l8 -4" />
              <path d="M4 16l8 4l8 -4" />
            </svg>
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default GuestLayout;
