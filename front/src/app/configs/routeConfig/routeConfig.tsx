import { RouteProps } from "react-router-dom";
import { MainPage } from "@pages/MainPage";
import { ErrorPage } from "@pages/ErrorPage";

export enum AppRoutes {
  MAIN = "main",
  ERROR = "error",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ERROR]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ERROR]: {
    path: RoutePath.error,
    element: <ErrorPage />,
  },
};
