import React from "react";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useCreator from "../../../hooks/useCreator";
import toast from "react-hot-toast";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const [isCreator] = useCreator();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myContests"],
    enabled: !!isCreator,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/creator/contest?email=${user?.email}`
      );
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["contest "],
    mutationFn: (id) => {
      return axiosSecure.delete(`/creator/contest/${id}`);
    },
    onSuccess: () => {
      toast.success("Contest has been deleted");
      queryClient.invalidateQueries({ queryKey: ["myContests"] });
    },
  });

  const handleDelete = (_id) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        Are you sure you want to <b>delete the contest?</b>
        <br />
        <button
          onClick={() => mutate(_id)}
          className="btn btn-sm btn-error text-white"
        >
          Delete
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="btn btn-sm btn-neutral"
        >
          Dismiss
        </button>
      </span>
    ));
  };

  console.log(contests);
  return (
    <div className="">
      <div className="overflow-x-auto">
        {/* {isLoading && <p className="text-center mb-10">Loading...</p>} */}
        {user && isCreator && (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Contest Image</th>
                <th>Contest Name</th>
                <th>Contest Type</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {contests?.map((contest) => (
                <tr key={contest._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={contest?.image} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-bold ">{contest.contestName}</td>
                  <td>{contest.tags}</td>
                  <th>
                    <button
                      className="btn btn-sm bg-yellow-600 text-white hover:bg-slate-700"
                      disabled={contest.status !== "pending"}
                    >
                      Update
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn  btn-outline btn-sm btn-error"
                      disabled={contest.status !== "pending"}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

MyCreatedContest.propTypes = {};

export default MyCreatedContest;
