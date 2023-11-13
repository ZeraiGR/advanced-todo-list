import { FC } from "react";
// import { Button, ButtonTheme, classNames, LightIcon, DarkIcon } from "shared";
import { useTheme, Theme } from "app/providers/ThemeProvider";
import { Button } from "@mui/material";
import classNames from "classnames";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} className={classNames(className)}>
      {theme === Theme.DARK
        ? "dark"
        : // <DarkIcon className={cls.icon} />
          // <LightIcon className={cls.icon} />
          "light"}
    </Button>
  );
};
