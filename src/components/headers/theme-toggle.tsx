import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { IconButton } from "../inputs/icon-button";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "@top-name-card/localstorage/theme";
const persistTheme = (theme: string) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

const loadPersistedTheme = (): Theme => {
  return (localStorage.getItem(THEME_STORAGE_KEY) || "dark") as Theme;
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(loadPersistedTheme());
  useEffect(() => {
    document.documentElement.setAttribute("class", loadPersistedTheme());
  }, []);
  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    persistTheme(nextTheme);
    document.documentElement.setAttribute("class", nextTheme);
  };
  return (
    <IconButton
      onClick={toggleTheme}
      icon={theme === "light" ? faSun : faMoon}
    />
  );
};
