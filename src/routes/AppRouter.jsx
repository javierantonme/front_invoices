// src/routes/AppRouter.jsx

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CustomersPage from "../pages/CustomersPage.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import InvoicesPage from "../pages/InvoicesPage.jsx";
import CreateInvoicePage from "../pages/CreateInvoicePage.jsx";
import SelfRegister from "../pages/SelfRegister.jsx";

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
      { path: "/services", element: <ServicesPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/invoices", element: <InvoicesPage /> },
      { path: "/invoices/new", element: <CreateInvoicePage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SelfRegister />, // Ruta pública para el registro
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
