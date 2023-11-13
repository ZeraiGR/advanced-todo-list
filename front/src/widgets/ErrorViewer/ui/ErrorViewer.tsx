import { FC } from "react";
import classNames from "classnames";
import type { FallbackProps } from "react-error-boundary";
import cls from "./ErrorViewer.module.scss";
import { Button } from "@mui/material";

interface ErrorViewerProps extends FallbackProps {
  className?: string;
}

export const ErrorViewer: FC<ErrorViewerProps> = ({ className, error }) => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={classNames(cls.viewer, className)}>
      <p>Произошла непредвиденная ошибка</p>
      <p>{error.message}</p>
      <Button className={cls.btn} onClick={reloadPage}>
        Перезагрузить страницу
      </Button>
    </div>
  );
};
