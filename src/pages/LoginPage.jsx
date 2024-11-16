// src/pages/LoginPage.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/public/login", {
        email,
        password,
      });

      login(response.data); // Suponiendo que `response.data` contiene usuario y token
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Welcome Section */}
      <div className="flex-1 bg-blue-500 text-white flex items-center justify-center">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to InvoiceApp</h1>
          <p className="text-lg">
            Manage your clients, services, and invoices effortlessly. Sign in to
            get started!
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
