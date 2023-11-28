import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllContests from "../pages/all-contest/AllContests";
import Details from "../pages/Details/Details";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Payment from "../pages/payment/Payment";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/dashboard/Dashboard";
import AddContest from "../components/dashboard/creatorDashboard/AddContest";
import MyCreatedContest from "../components/dashboard/creatorDashboard/MyCreatedContest";
import SubmittedContest from "./../components/dashboard/creatorDashboard/SubmittedContest";
import CreatorRoute from "./CreatorRoute";
import AdminRoute from "./AdminRoute";
import ManageContests from "../components/dashboard/adminDashboard/ManageContests";
import ManageUsers from "../components/dashboard/adminDashboard/ManageUsers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-contest",
        element: <AllContests />,
      },
      {
        path: "/:id",
        element: <Details />,
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-contest",
        element: (
          <CreatorRoute>
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "created-contest",
        element: (
          <CreatorRoute>
            <MyCreatedContest />
          </CreatorRoute>
        ),
      },
      {
        path: "submitted-contest",
        element: (
          <CreatorRoute>
            <SubmittedContest />
          </CreatorRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <AdminRoute>
            <ManageContests />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);
export default router;
