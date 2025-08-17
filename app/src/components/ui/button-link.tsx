import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface ButtonLinkProps extends PropsWithChildren {
  href: string;
  value?: string;
  className?: string;
}

const ButtonLink = ({ href, value, children, ...props }: ButtonLinkProps) => {
  return (
    <Link href={href} {...props}>
      {value || children}
    </Link>
  );
};

export default ButtonLink;
