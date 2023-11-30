import React from "react";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../Title";
import { useQuery } from "@tanstack/react-query";
import Container from "./../../shared/Container";
import moment from "moment";

const ParticiPatedContests = (props) => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [] } = useQuery({
    queryKey: ["registeredContests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-payments?participant=${user?.email}&sortField=deadline&sortOrder=asc`
      );
      return data;
    },
  });
  console.log(contests);
  return (
    <div>
      {user && <Title>Total Registered Contests: {contests?.length}</Title>}
      <Container>
        {user && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto">
            {contests?.map((contest) => (
              <div key={contest._id} className="group relative block bg-black ">
                {contest?.image && (
                  <img
                    alt=" "
                    src={contest?.image}
                    className="absolute inset-0 h-full w-full object-cover  opacity-75 transition-opacity group-hover:opacity-50"
                  />
                )}

                <div className="relative p-4 sm:p-6 lg:p-8  ">
                  <div className="bg-black p-2 bg-opacity-50 rounded-md">
                    {" "}
                    <p className="text-sm   uppercase tracking-widest font-semibold text-yellow-600">
                      {contest.contestName}
                    </p>
                    <p className="text-xl font-black text-white sm:text-2xl">
                      {moment(contest.deadline).endOf("day").fromNow()}
                    </p>
                  </div>

                  <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="text-sm text-white">
                        {contest.contestDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

ParticiPatedContests.propTypes = {};

export default ParticiPatedContests;
