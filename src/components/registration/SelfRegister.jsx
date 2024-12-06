import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import Swal from "sweetalert2";
import Spinner from "../Spinner";
import WelcomeSection from "./WelcomeSection";
import RegistrationForm from "./RegistrationForm";

const SelfRegister = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consecInit: 0,
    initialValue: 0.0,
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          throw new Error(
            "Token is missing. Please check your invitation link."
          );
        }

        const response = await api.get(
          `/public/selft_registration?token=${token}`
        );
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

  const handleSubmit = async (data, termsAccepted) => {
    if (!termsAccepted) {
      return Swal.fire(
        "Error",
        "You must accept the terms and conditions to register.",
        "error"
      );
    }

    try {
      setLoading(true);
      await api.post(`/public/register?token=${token}`, data);
      Swal.fire("Success", "Registration successful!", "success");
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

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white border border-red-500 rounded-lg shadow-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Something Went Wrong
          </h2>
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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <WelcomeSection />
      <RegistrationForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default SelfRegister;
