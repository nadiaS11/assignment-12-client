import React from "react";
import PropTypes from "prop-types";
import PersistentDrawerLeft from "./shareddashboard/PersistentDrawer";
import { StyledEngineProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <PersistentDrawerLeft />
      </StyledEngineProvider>
      <div className="pl-5  min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
