"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { useTheme } from "next-themes"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type ModeToggleProps = {
  className?: ComponentProps<typeof Button>["className"]
  size?: ComponentProps<typeof Button>["size"]
}

export function ModeToggle({ className, size = "icon" }: ModeToggleProps) {
  const { setTheme, resolvedTheme, theme } = useTheme()

  return (
    <Button
      type="button"
      variant="ghost"
      size={size}
      className={className ?? "rounded-none border border-border/60 bg-background/80 shadow-sm backdrop-blur transition-colors hover:bg-background dark:bg-background/60 dark:hover:bg-background/80"}
      onClick={() => setTheme((resolvedTheme ?? theme) === "dark" ? "light" : "dark")}
      aria-label="Alternar modo escuro"
    >
      <FontAwesomeIcon icon={faSun} className="block! h-4 w-4 dark:hidden!" />
      <FontAwesomeIcon icon={faMoon} className="hidden! h-4 w-4 dark:block!" />
    </Button>
  )
}