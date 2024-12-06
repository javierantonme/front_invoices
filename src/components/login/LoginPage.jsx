import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import WelcomeSection from "./WelcomeSection";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    setError("");
    setIsLoading(true);
    try {
      const response = await api.post("/public/login", { email, password });
      login(response.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <WelcomeSection />
      <LoginForm
        isLoading={isLoading}
        error={error}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
