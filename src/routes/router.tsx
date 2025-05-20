import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages imports
import Home from "../pages/home/Home";
import Game from "../pages/game/Game";
import EndGame from "../pages/game/EndGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  {
    path: "/end",
    element: <EndGame />,
  }
]);
export function Routes() {
  return <RouterProvider router={router} />;
}
