// src/routes/AppRouter.jsx

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "../components/login/LoginPage.jsx";
import Dashboard from "../components/dashboard/Dashboard.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CustomersPage from "../components/customers/CustomersPage.jsx";
import ServicesPage from "../components/services/ServicesPage.jsx";
import ProfilePage from "../components/profile/ProfilePage.jsx";
import InvoicesPage from "../components/invoices/InvoicesPage";
import CreateInvoicePage from "../components/creteInvoices/CreateInvoicePage.jsx";
import SelfRegister from "../components/registration/SelfRegister";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import InviteUserPage from "../components/invitation/InviteUserPage.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import UsersTable from "../components/users/UsersTable.jsx";
import TermsAndConditions from "../components/term_and_conditions/TermsAndConditions";
import LicencesTable from "../components/licences/LicencesTable.jsx";

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
      { path: "*", element: <NotFoundPage /> },
      { path: "/clients", element: <CustomersPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/invoices", element: <InvoicesPage /> },
      { path: "/invoices/new", element: <CreateInvoicePage /> },
      { path: "/termsandconditions", element: <TermsAndConditions /> },
      {
        path: "/invite",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <InviteUserPage />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <UsersTable />
          </RoleProtectedRoute>
        ),
      },
      {
        path: "/licences",
        element: (
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <LicencesTable />
          </RoleProtectedRoute>
        ),
      }, // Nueva ruta // Nueva ruta
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
  
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
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
