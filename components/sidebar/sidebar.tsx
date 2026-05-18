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
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-none bg-white p-2">
                    <Image
                        src="/logo-semfundo.png"
                        alt="Meu Plantao"
                        width={48}
                        height={48}
                        priority
                        className="h-auto w-full object-contain"
                    />
                </div>
                <div>
                    <p className="text-xs font-medium text-white/60">Meu Plantão</p>
                    <h1 className="text-lg font-semibold text-white">Painel Admin</h1>
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
                <button className="flex w-full items-center justify-between rounded-none border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black">
                    <span>Sair</span>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="h-4 w-4" />
                </button>
            </div>
        </aside>
    );
}