import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useContext(AuthContext); // Obtener información del usuario

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold">Invoice App</h1>
        {/* Información del usuario */}
        <div className="text-right">
          <p className="text-sm font-semibold">
            {user?.userLoged?.firstName} {user?.userLoged?.lastName}
          </p>
          <p className="text-xs text-gray-300">{user?.userLoged?.email}</p>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 bg-gray-800 text-white p-4 z-50 transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 w-64 flex flex-col`}
        >
          <div className="flex-1">
            <nav className="mt-4">
              <ul>
                <li>
                  <Link to="/" className="block p-2 hover:bg-gray-700 rounded">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/invoices"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    My Invoices
                  </Link>
                </li>
                <li>
                  <Link
                    to="/clients"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block p-2 hover:bg-gray-700 rounded"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* Botón de Logout fijo en la parte inferior */}
          <div className="mt-4">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Overlay for Sidebar on Small Screens */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Content */}
        <main className="flex-1 bg-gray-100 p-8 ml-0">
          {/* Navbar for Small Screens */}
          <div className="flex items-center justify-between bg-white p-4 shadow-md md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold">Facturación App</h2>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
