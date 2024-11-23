import { useContext } from "react"; // React y useContext para trabajar con el contexto
import { Navigate } from "react-router-dom"; // Para redirigir
import { AuthContext } from "../context/AuthContext"; // Contexto de autenticación

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // Validar si el usuario tiene un rol permitido
  if (!user || !allowedRoles.includes(user.userLoged.role)) {
    return <Navigate to="/" replace />;
  }

  return children; // Renderizar el contenido si el rol es válido
};

export default RoleProtectedRoute;
