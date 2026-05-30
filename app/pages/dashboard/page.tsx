'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import Sidebar from "@/components/sidebar/sidebar";
import Particles from "@/components/ui/particles";
import ResumoPlantoes from "@/components/dashboard/page";

export default function Dashboard() {
  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-background md:pl-72">
      <Particles
        particleColors={["#000000", "#111827", "#374151"]}
        particleCount={400}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
        className="fixed inset-0 z-0 opacity-55"
      />
      <Sidebar />
      <main className="relative z-10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300">
            <FontAwesomeIcon icon={faChartLine} className="h-3.5 w-3.5" />
            Dashboard principal
          </div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Visão geral dos plantões e usuários cadastrados para acompanhamento diário.
          </p>
        </div>
        <ResumoPlantoes />
      </main>
    </div>
  );
}