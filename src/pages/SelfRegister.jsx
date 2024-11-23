import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const SelfRegister = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", // Campo incluido
    email: "",
    consecInit: 0,
    initialValue: 0.0,
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          throw new Error("Token is missing. Please check your invitation link.");
        }

        const response = await api.get(`/public/selft_registration?token=${token}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordValidation({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post(`/public/register?token=${token}`, formData);
      Swal.fire("Success", "Registration successful!", "success");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        consecInit: 0,
        initialValue: 0.0,
        password: "",
      });

      navigate("/login");
    } catch (err) {
      console.error("Error registering user:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to register. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white border border-red-500 rounded-lg shadow-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Welcome Section */}
      <div className="bg-blue-500 text-white flex items-center justify-center p-6 md:flex-1">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
          <p className="text-lg">
            Register and complete your profile to start using the application.
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Complete Registration
          </h2>
          <form onSubmit={handleSubmit}>
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <ul className="text-sm text-gray-700 mb-4 space-y-1">
              <li className={passwordValidation.length ? "text-green-500" : ""}>
                At least 8 characters
              </li>
              <li className={passwordValidation.uppercase ? "text-green-500" : ""}>
                At least one uppercase letter
              </li>
              <li className={passwordValidation.lowercase ? "text-green-500" : ""}>
                At least one lowercase letter
              </li>
              <li className={passwordValidation.number ? "text-green-500" : ""}>
                At least one number
              </li>
              <li className={passwordValidation.specialChar ? "text-green-500" : ""}>
                At least one special character
              </li>
            </ul>
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
