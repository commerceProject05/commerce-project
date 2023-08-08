import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      // path: "/detail/:id",
      path: "/detail/",
      element: <Detail />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
