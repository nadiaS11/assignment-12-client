import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import useCreator from "../hooks/useCreator";

const CreatorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isCreator, isCreatorLoading] = useCreator();
  const location = useLocation();
  if (loading || isCreatorLoading) {
    return <TbFidgetSpinner className="mt-10 mx-auto  animate-spin" />;
  }
  if (user && isCreator) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace="true" />;
};

CreatorRoute.propTypes = {};

export default CreatorRoute;
