import React from "react";
import PropTypes from "prop-types";
import PersistentDrawerLeft from "./shareddashboard/PersistentDrawer";
import { StyledEngineProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <PersistentDrawerLeft />
      </StyledEngineProvider>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          {" "}
          <div className=" flex flex-col  ">
            <div className="  relative ">
              {" "}
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img className="w-[60%]  " src={user?.photoURL} alt="" />
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-32 text-center border-b pb-12">
            {" "}
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.displayName}
            </h1>{" "}
            <p className="font-light text-gray-600 mt-3">{user?.email}</p>{" "}
          </div>{" "}
        </div>
      </div>
      <div className="pl-5  min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
