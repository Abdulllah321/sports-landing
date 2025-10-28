"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(saved ?? (prefersDark ? "dark" : "light"));
    } catch {}
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    if (next === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  if (!mounted)
    return (
      <motion.div
        // initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          <Sun className="h-5 w-5" />
        </Button>
      </motion.div>
    );

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggle}
        aria-label="Toggle theme"
        // className="relative overflow-hidden transition-all duration-200 hover:shadow-md"
      >
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}
