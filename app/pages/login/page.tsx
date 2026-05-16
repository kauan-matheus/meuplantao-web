"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });
import { ModeToggle } from "@/components/mode-toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Login() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-2">
      <section className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="absolute left-10 top-6 z-20 sm:left-10 sm:top-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-linear-to-br from-zinc-100 via-white to-zinc-200 p-2 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-sm dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-800 dark:shadow-black/30 dark:ring-white/10">
            <Image
              src="/logo-semfundo.png"
              alt="Meu Plantao"
              width={72}
              height={72}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>

        <div className="absolute right-10 top-6 z-20 sm:right-10 sm:top-10">
          <ModeToggle />
        </div>

        <div className="w-full max-w-xl rounded-none border border-transparent bg-card/95 p-10 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-12 dark:border-white/10 dark:bg-white/5 dark:shadow-black/30 dark:backdrop-blur-xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase text-muted-foreground">
              Meu Plantao Admin
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Faça Seu Login
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Acesse sua conta para continuar.
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="fieldgroup-email" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-black dark:text-white" />
                Email
              </label>
              <Input
                id="fieldgroup-email"
                type="email"
                placeholder="nome@email.com"
                className="h-12 rounded-none px-4 text-base"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="fieldgroup-password" className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-black dark:text-white" />
                Senha
              </label>
              <Input
                id="fieldgroup-password"
                type="password"
                placeholder="********"
                className="h-12 rounded-none px-4 text-base"
              />
            </div>

            <div className="flex justify-start">
              <Button type="submit" className="h-12 w-full rounded-none px-10 text-base font-medium">
                <FontAwesomeIcon icon={faRightToBracket} className="mr-2 h-4 w-4" />
                Entrar
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
            Gerencie, administre e monitore suas operações de plantão de forma eficiente e intuitiva.
          </p>
        </div>
      </section>
    </main>
  );
}
