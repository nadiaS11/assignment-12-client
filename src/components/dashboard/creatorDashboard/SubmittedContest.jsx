import React from "react";
import PropTypes from "prop-types";
import Title from "../../Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useCreator from "../../../hooks/useCreator";

const SubmittedContest = (props) => {
  const axioSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [isCreator] = useCreator();

  const { data: contests } = useQuery({
    queryKey: ["submittedContests"],
    enabled: !!isCreator,
    queryFn: async () => {
      const res = await axioSecure.get(
        `/submitted-participants?creator=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  return (
    <div>
      <Title>Submitted Contest</Title>
      <div className="overflow-x-auto">
        {/* {isLoading && <p className="text-center mb-10">Loading...</p>} */}
        {user &&
          isCreator &&
          contests?.map((cont, idx) => (
            <table key={idx} className="table mb-10">
              {/* head */}
              <thead className=" ">
                <tr>
                  <th className="font-bold text-xl">{cont?._id}</th>
                  <th>Choose Winner</th>
                </tr>
              </thead>

              <tbody>
                {cont?.participants?.map((part, idx) => (
                  <tr key={idx}>
                    <th>{part}</th>
                    <th>
                      <button className="btn  btn-outline btn-sm btn-error">
                        Declare Winner
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
    </div>
  );
};

SubmittedContest.propTypes = {};

export default SubmittedContest;
