"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faCalendarDays,
    faUserDoctor,
    faClipboardList,
    faGear,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { ModeToggle } from "@/components/mode-toggle";

const navItems = [
    { label: "Dashboard", href: "/pages/dashboard", icon: faChartLine, active: true },
    { label: "Plantões", href: "/pages/dashboard", icon: faCalendarDays },
    { label: "Equipe", href: "/pages/dashboard", icon: faUserDoctor },
    { label: "Relatórios", href: "/pages/dashboard", icon: faClipboardList },
    { label: "Configurações", href: "/pages/dashboard", icon: faGear },
];

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden h-screen w-72 flex-col border-r border-white/10 bg-black text-white md:flex">
            <div className="border-b border-white/10 px-6 py-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-none border border-white/15 bg-white p-2 shadow-[0_10px_30px_-18px_rgba(255,255,255,0.45)]">
                        <Image
                            src="/logo-semfundo.png"
                            alt="Meu Plantao"
                            width={48}
                            height={48}
                            priority
                            className="h-auto w-full object-contain"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white/55">Meu Plantão</p>
                        <h1 className="mt-1 text-xl font-semibold leading-tight text-white">
                            Painel Admin
                        </h1>
                        <p className="mt-1 text-sm leading-5 text-white/60">
                            Gestão operacional
                        </p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-6">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`group flex items-center gap-3 rounded-none px-4 py-3 text-sm font-medium transition ${
                            item.active
                                ? "bg-white text-black"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                    >
                        <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="border-t border-white/10 px-6 py-6">
                <div className="mb-4 flex items-center gap-3 rounded-none border border-white/10 px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-white text-xs font-semibold text-black">
                        MP
                    </div>
                    <div className="flex min-w-0 flex-col">
                        <span className="text-[0.65rem] font-medium text-white/50">
                            Conta
                        </span>
                        <span className="truncate text-sm font-medium">meuplantao@ad...</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex flex-1 items-center justify-between rounded-none border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black">
                        <span>Sair</span>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-4 w-4" />
                    </button>
                    <ModeToggle
                        className="h-11.5 w-11 rounded-none border border-white/20 bg-white/10 text-white shadow-none transition-colors hover:bg-white hover:text-black dark:bg-white/10 dark:hover:bg-white"
                    />
                </div>
            </div>
        </aside>
    );
}