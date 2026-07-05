"use client";

import { signIn, useSession } from "next-auth/react";

export function AuthenticatedCheckoutLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const linkedHref = session?.user?.discordId
    ? `${href}${href.includes("?") ? "&" : "?"}client_reference_id=${encodeURIComponent(session.user.discordId)}`
    : href;
  return (
    <a
      href={linkedHref}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={(event) => {
        if (status === "authenticated") return;
        event.preventDefault();
        void signIn("discord");
      }}
    >
      {children}
    </a>
  );
}

