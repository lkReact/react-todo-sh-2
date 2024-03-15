import type { RouteObject } from "react-router";
import App from "../../views/App.tsx";
import _404 from "../../views/_404.tsx";
import MySpace from "../../views/MySpace.tsx";

import CakesShop from "../../views/CakesShop.tsx";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/my-space",
    element: <MySpace />,
    children: [
      {
        path: "cakes",
        element: <CakesShop />,
      },
    ],
  },
  {
    path: "*",
    element: <_404 />,
  },
];

export default routes;
