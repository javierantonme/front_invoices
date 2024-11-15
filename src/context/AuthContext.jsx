import  { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
// Crear el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario guardado
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para manejar el inicio de sesión
  const login = (userData) => {
    setUser(userData); // Establecer el usuario en el estado
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar el usuario en localStorage
    setLoading(false); // Finaliza la carga después de loguear
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Limpiar el estado del usuario
    localStorage.removeItem("user"); // Eliminar el usuario de localStorage
  };

  // Cargar el usuario desde localStorage cuando la aplicación se inicializa
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restaurar el usuario desde localStorage
    }
    setLoading(false); // Finaliza la carga una vez que se ha comprobado el localStorage
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
