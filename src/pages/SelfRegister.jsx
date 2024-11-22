import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../axiosConfig";
import Swal from "sweetalert2";

const SelfRegister = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    abn: "",
    bsb: "",
    accountNumber: "",
    consecInit: 0,
    initialValue: 0.0,
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validar el token al cargar el componente
  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          throw new Error("Token is missing. Please check your invitation link.");
        }

        // Prellenar el correo desde el token si es válido
        const response = await api.get(`/public/register?token=${token}`);
        setFormData((prev) => ({ ...prev, email: response.data.email }));
        setLoading(false);
      } catch (err) {
        console.error("Error validating token:", err);
        setError(err.response?.data?.error || "Invalid or expired token.");
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas coincidentes
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match.", "error");
    }

    try {
      // Enviar los datos del formulario al backend
      await api.post(`/public/register?token=${token}`, formData);
      Swal.fire("Success", "Registration successful!", "success");
    } catch (err) {
      console.error("Error registering user:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to register. Please try again.",
        "error"
      );
    }
  };

  // Mostrar carga o errores si es necesario
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Validating invitation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Welcome Section */}
      <div className="flex-1 bg-blue-500 text-white flex items-center justify-center">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
          <p className="text-lg">
            Register and complete your profile to start using the application.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Complete Registration
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email (cannot be changed)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                readOnly
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelfRegister;
