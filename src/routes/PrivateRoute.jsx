// src/routes/PrivateRoute.jsx
import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import Spinner from '../components/Spinner'
const PrivateRoute = ({ children }) => {
  const { user, loading  } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }


  // Si no hay usuario autenticado, redirigir al login
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
