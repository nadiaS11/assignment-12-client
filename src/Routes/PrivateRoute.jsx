import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <TbFidgetSpinner />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace="true" />;
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
