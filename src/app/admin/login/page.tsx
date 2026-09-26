import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="grid min-h-svh place-items-center px-4 py-16">
      <div className="w-full max-w-sm">
        <Logo className="h-8 w-auto" />
        <h1 className="mt-10 font-serif text-4xl tracking-tight">Welcome back.</h1>
        <p className="mt-2 text-sm text-mute">Sign in to write and publish stories.</p>
        <LoginForm />
      </div>
    </main>
  );
}
