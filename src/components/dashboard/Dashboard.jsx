import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../Spinner";
import DashboardStats from "./DashboardStats";
import CharIncome from "./CharIncome"; // Gráfico de ingresos
import ErrorMessage from "./ErrorMessage";

const Dashboard = () => {
  const [data, setData] = useState({
    totalInvoices: 0,
    fiscalPeriodInvoices: 0,
    taxProvision: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, logout } = useContext(AuthContext); // Acceso a logout para cerrar sesión
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
        users: response.data.totalUsers,
        summation: response.data.totalByMonth,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        // Si el token es inválido, cerrar sesión
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

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardStats data={data} user={user} />
      <CharIncome summation={data.summation} />
    </div>
  );
};

export default Dashboard;
