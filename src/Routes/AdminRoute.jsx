import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <TbFidgetSpinner className="mt-10 mx-auto  animate-spin" />;
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace="true" />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
