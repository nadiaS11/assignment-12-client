import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Navbar from "./../../components/Navbar";

const MainLayout = (props) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
