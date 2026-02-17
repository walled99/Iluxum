"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/supabase/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react";

export default function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [state, action, isPending] = useActionState(registerAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      router.push(`/${locale}/account`);
      router.refresh();
    }
  }, [state, router, locale]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-md space-y-12">
        <header className="text-center space-y-4">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-ink italic leading-tight">
            Create Account
          </h1>
          <p className="font-body text-sm text-ink/40 uppercase tracking-[0.2em]">
            Join the Iluxum inner circle
          </p>
        </header>

        <form action={action} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-body text-[10px] uppercase tracking-widest text-ink/60">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jane"
                required
                className="rounded-none border-surface bg-surface/30 focus:border-accent transition-colors h-12 font-body text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-body text-[10px] uppercase tracking-widest text-ink/60">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                required
                className="rounded-none border-surface bg-surface/30 focus:border-accent transition-colors h-12 font-body text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-body text-[10px] uppercase tracking-widest text-ink/60">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              required
              className="rounded-none border-surface bg-surface/30 focus:border-accent transition-colors h-12 font-body text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-body text-[10px] uppercase tracking-widest text-ink/60">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-none border-surface bg-surface/30 focus:border-accent transition-colors h-12 font-body text-sm"
            />
          </div>

          {state && 'error' in state && state.error && (
            <p className="text-xs text-destructive font-body italic">
              {state.error}
            </p>
          )}

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-12 rounded-none bg-primary text-background font-body text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        <footer className="text-center pt-8 border-t border-surface">
          <p className="font-body text-xs text-ink/60">
            Already have an account?{" "}
            <Link 
              href={`/${locale}/login`} 
              className="text-accent hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px] ml-2"
            >
              Sign In
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
