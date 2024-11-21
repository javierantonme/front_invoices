// src/pages/Dashboard.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [data, setData] = useState({
    totalInvoices: 0,
    fiscalPeriodInvoices: 0,
    taxProvision: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {logout } = useContext(AuthContext); // Acceso a logout para cerrar sesión
  const navigate = useNavigate();

  // Función para obtener los datos del backend
  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/private/invoices/allamount", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Incluye el token en el encabezado
        },
      });
      setData({
        totalInvoices: response.data.totalAmount,
        fiscalPeriodInvoices: response.data.totalAmount,
        taxProvision: response.data.totalSavesForTaxes,
        quantity: response.data.invoiceCount,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // Si el token es inválido, cerrar sesión
        console.log(`Token no valido`, err);
        logout();
        navigate("/login");
      } else {
        setError("Failed to fetch data");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Invoices */}
        <div className="bg-blue-500 text-white rounded-lg shadow-md flex items-center justify-center h-40">
          <div className="text-center">
            <p className="text-lg font-semibold">Number of Invoices</p>
            <p className="text-3xl font-bold">{data.quantity}</p>
          </div>
        </div>

        {/* Fiscal Period Invoices */}
        <div className="bg-green-500 text-white rounded-lg shadow-md flex items-center justify-center h-40">
          <div className="text-center">
            <p className="text-lg font-semibold">Total Amount</p>
            <p className="text-3xl font-bold">${data.fiscalPeriodInvoices}</p>
          </div>
        </div>

        {/* Tax Provision */}
        <div className="bg-red-500 text-white rounded-lg shadow-md flex items-center justify-center h-40">
          <div className="text-center">
            <p className="text-lg font-semibold">Tax Provision</p>
            <p className="text-3xl font-bold">${data.taxProvision}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
