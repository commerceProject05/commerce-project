import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Auth from "./pages/Auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/auth/kakao",
      element: <Auth />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
