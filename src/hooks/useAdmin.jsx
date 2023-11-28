import React from "react";
import PropTypes from "prop-types";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/admin?email=${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });

  return [isAdmin, isAdminLoading];
};

useAdmin.propTypes = {};

export default useAdmin;
