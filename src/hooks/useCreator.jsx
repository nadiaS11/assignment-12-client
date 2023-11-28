import React from "react";
import PropTypes from "prop-types";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCreator = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isCreator, isLoading: isCreatorLoading } = useQuery({
    queryKey: [user?.email, "isCreator"],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/creator/${user?.email}`);
      console.log(res.data);
      return res.data?.creator;
    },
  });

  return [isCreator, isCreatorLoading];
};

useCreator.propTypes = {};

export default useCreator;
