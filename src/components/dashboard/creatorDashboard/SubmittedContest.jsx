import React, { useState } from "react";
import PropTypes from "prop-types";
import Title from "../../Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useCreator from "../../../hooks/useCreator";
import { Listbox } from "@headlessui/react";
import toast from "react-hot-toast";

const SubmittedContest = (props) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [isCreator] = useCreator();

  const [winner, setWinner] = useState("");

  const { data: contests = [], isLoading: contestsLoading } = useQuery({
    queryKey: ["submittedContests"],
    enabled: !!isCreator,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submitted-participants?creator=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const handleWinner = async (value, contest) => {
    setWinner(value);
    console.log(contest);
    console.log({ contestName: contest, winnerEmail: value });
    try {
      const res = await axiosSecure.patch("/selected-winner", {
        contestName: contest,
        winnerEmail: value,
      });
      console.log(res.data);
      toast.success("Winner updated successfully");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <Title>Submitted Contest</Title>
      {!contestsLoading && contests.length > 0 ? (
        <div className="overflow-x-auto">
          {user &&
            isCreator &&
            contests?.map((cont, idx) => (
              <table key={idx} className="table  ">
                {/* head */}
                <thead className="  table-row-group ">
                  <tr>
                    <th className="font-bold text-xl">{cont?._id}</th>

                    <th>
                      {cont?.winnerEmail ? (
                        `Winner is ${cont?.winnerEmail}`
                      ) : (
                        <Listbox
                          value={winner}
                          onChange={(value) => handleWinner(value, cont._id)}
                        >
                          <Listbox.Button className="select  select-bordered rounded w-full ">
                            <span>{"Select Winner"}</span>
                          </Listbox.Button>
                          <Listbox.Options>
                            {cont?.participants?.map((user, idx) => (
                              <Listbox.Option
                                className={"text-black p-2 cursor-pointer"}
                                key={idx}
                                value={user}
                              >
                                {user}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      )}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cont?.participants?.map((user, idx) => (
                    <tr key={idx} className={"flex flex-col"}>
                      <th>{user}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
        </div>
      ) : (
        <p>No submitted contests yet</p>
      )}
    </div>
  );
};

SubmittedContest.propTypes = {};

export default SubmittedContest;
