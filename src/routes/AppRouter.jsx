// src/routes/AppRouter.jsx

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CustomersPage from "../pages/CustomersPage.jsx";

const router = createBrowserRouter([
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
      { path: "/clients", element: <CustomersPage /> },
      { path: "/services", element: <div>Servicios</div> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const AppRouter = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true, // Habilita la bandera de transición anticipadamente
      }}
    />
  );
};

export default AppRouter;
