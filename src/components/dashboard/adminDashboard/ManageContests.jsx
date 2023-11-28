import React from "react";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageContests = (props) => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["pendingContests"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get("/get-pending-contests");
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["contest"],
    mutationFn: (id) => {
      return axiosSecure.delete(`/delete-pending-contest/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pendingContests"] });
    },
  });

  const handleDelete = (_id) => {
    toast((t) => (
      <span className="flex flex-col gap-2">
        Are you sure you want to <b>delete the contest?</b>
        <br />
        <button
          onClick={() => {
            mutate(_id);
            // refetch();
            toast.success("Deleted", { id: t.id });
          }}
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

  const handleConfirm = (_id, contest) => {
    const newContest = {
      contestName: contest.contestName,
      image: contest.image,
      contestDetails: contest.contestDetails,
      contestPrice: contest.contestPrice,
      tags: contest.tags,
      award: contest.award,
      deadline: contest.deadline,
      rules: contest.rules,
      status: "confirmed",
      creator: contest.creator,
    };
    try {
      toast((t) => (
        <span className="flex flex-col gap-2">
          Are you sure you want to <b>confirm the contest?</b>
          <br />
          <button
            onClick={async () => {
              const res = await axiosSecure.patch(
                `/confirm-pending-contest/${_id}`,
                newContest
              );
              refetch();
              toast.success("Confirmed", { id: t.id });
              return res.data;
            }}
            className="btn btn-sm btn-error text-white"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="btn btn-sm btn-neutral"
          >
            Dismiss
          </button>
        </span>
      ));
    } catch (err) {
      console.log(err);
    }
  };
  console.log(contests);
  return (
    <div className="">
      <div className="overflow-x-auto">
        {/* {isLoading && <p className="text-center mb-10">Loading...</p>} */}
        {user && isAdmin && (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Contest Image</th>
                <th>Contest Name</th>
                <th>Contest Status</th>
                <th>Approve</th>
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
                  {contest.status === "pending" ? (
                    <td className=" text-red-600 font-bold">Pending</td>
                  ) : (
                    <td className=" text-green-600 font-bold">Active</td>
                  )}
                  <th>
                    <button
                      className="btn btn-sm bg-yellow-600 text-white hover:bg-slate-700"
                      onClick={() => handleConfirm(contest._id, contest)}
                      disabled={contest.status !== "pending"}
                    >
                      Confirm
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(contest._id)}
                      className="btn  btn-outline btn-sm btn-error"
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

ManageContests.propTypes = {};

export default ManageContests;
