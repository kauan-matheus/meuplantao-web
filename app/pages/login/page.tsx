"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/lib/hooks/use-auth";
import { ApiError } from "@/lib/types/api.types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
  faCircleExclamation,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Se já autenticado, redirecionar para dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/pages/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Validação client-side básica
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      router.push("/pages/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="absolute left-10 top-6 z-20 sm:left-10 sm:top-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl p-2">
            <Image
              src="/logo-semfundo.png"
              alt="Meu Plantao"
              width={72}
              height={72}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="absolute right-10 top-6 z-20 sm:right-10 sm:top-10">
          <ModeToggle />
        </div>

        <div className="w-full max-w-xl rounded-none p-10">
          <div className="mb-8 text-center">
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Faça Seu Login
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Acesse sua conta para continuar.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              id="login-error"
              className="mb-6 flex items-center gap-3 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="h-4 w-4 shrink-0"
              />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label
                htmlFor="fieldgroup-email"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="h-4 w-4 text-black dark:text-white"
                />
                Email
              </label>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="nome@email.com"
                className="h-12 rounded-none px-4 text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="fieldgroup-password"
                className="flex items-center gap-2 text-sm font-medium text-foreground"
              >
                <FontAwesomeIcon
                  icon={faLock}
                  className="h-4 w-4 text-black dark:text-white"
                />
                Senha
              </label>
              <Input
                id="fieldgroup-password"
                type="password"
                placeholder="********"
                className="h-12 rounded-none px-4 text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="flex justify-start">
              <Button
                id="login-submit"
                type="submit"
                className="h-12 w-full rounded-none px-10 text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    Entrando…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faRightToBracket}
                      className="mr-2 h-4 w-4"
                    />
                    Entrar
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-linear-to-br from-zinc-950 via-neutral-900 to-black lg:block dark:from-black dark:via-zinc-950 dark:to-neutral-900">
        <div className="absolute inset-0">
          <Beams
            beamWidth={3}
            beamHeight={30}
            beamNumber={20}
            lightColor="#ffffff"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/90 via-zinc-950/35 to-neutral-950/85 dark:from-black dark:via-zinc-950/45 dark:to-neutral-950/95" />

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-12 text-white">
          <p className="text-sm font-medium uppercase tracking-widest text-white/80">
            Meu Plantao Painel Admin
          </p>
          <h2 className="mt-3 max-w-md text-4xl font-semibold leading-tight">
            Meu Plantão Gestão Web
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-zinc-200/80">
            Gerencie, administre e monitore suas operações de plantão de forma
            eficiente e intuitiva.
          </p>
        </div>
      </section>
    </main>
  );
}
