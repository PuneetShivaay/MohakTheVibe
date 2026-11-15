
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const THEME_EVENT = "mohak-theme-change";

// `labelled`: a full-width row with the words "Mohak Mode" (used in the mobile menu); default is the icon button.
// Two toggles can be mounted at once (bar and menu), so each re-reads the theme when one of them changes it.
export function ThemeToggle({ labelled = false, className }: { labelled?: boolean; className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("mohak-theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
    const sync = () => setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  const toggleTheme = () => {
    const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("mohak-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const Icon = theme === "light" ? Moon : Sun;

  if (labelled) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          "flex w-full items-center justify-between border-b border-border py-5 hover:text-brand-gold transition-colors",
          className
        )}
      >
        <span className="font-headline text-display-sm">Mohak Mode</span>
        <span className="flex items-center gap-3 text-sm text-foreground/70">
          {theme === "light" ? "Light" : "Dark"}
          <Icon aria-hidden className="h-5 w-5 text-brand-gold" />
        </span>
        <span className="sr-only">Switch to {theme === "light" ? "dark" : "light"} mode</span>
      </button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("rounded-full text-brand-gold hover:bg-brand-gold/10", className)}
    >
      <Icon className="h-5 w-5" />
      <span className="sr-only">Toggle Mohak Mode</span>
    </Button>
  );
}
