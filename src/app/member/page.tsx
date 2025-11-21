import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { createClient } from "@/lib/supabase/server";

export default async function MemberPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectedFrom=/member");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-2xl rounded-xl bg-white p-10 shadow-lg dark:bg-zinc-900">
        <header className="mb-8 flex flex-col gap-2">
          <p className="text-sm uppercase tracking-wide text-zinc-500">
            Member Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
            ようこそ
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            ログイン中のメールアドレス:{" "}
            <span className="font-medium text-black dark:text-zinc-100">
              {user.email}
            </span>
          </p>
        </header>
        <section className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            ホームへ戻る
          </Link>
          <LogoutButton />
        </section>
      </main>
    </div>
  );
}

