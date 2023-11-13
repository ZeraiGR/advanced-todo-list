import { FC } from "react";
import classnames from "classnames";
import cls from "./Header.module.scss";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return <header className={classnames(className, cls.header)}>header</header>;
};
