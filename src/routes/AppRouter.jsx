// src/routes/AppRouter.jsx

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </PrivateRoute>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/clients", element: <div>Clientes</div> },
        { path: "/services", element: <div>Servicios</div> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ],
  {
    future: {
      v7_startTransition: true, // Habilita la bandera de transición anticipadamente
    },
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
