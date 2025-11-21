import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type MemberLayoutProps = {
  children: ReactNode;
};

export default async function MemberLayout({ children }: MemberLayoutProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const headersList = await headers();
    const matchedPath = headersList.get("x-matched-path") ?? "/member";
    const redirectPath = matchedPath.startsWith("/")
      ? matchedPath
      : `/${matchedPath}`;
    const search = headersList.get("x-invoke-query") ?? "";
    const redirectedFrom = `${redirectPath}${search}`;

    redirect(
      `/login?redirectedFrom=${encodeURIComponent(redirectedFrom || "/member")}`
    );
  }

  return <>{children}</>;
}

