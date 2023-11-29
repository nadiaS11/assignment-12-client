import React, { useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ManageUsers = (props) => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const roles = ["user", "admin", "creator"];

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const res = await axiosSecure.get("/get-all-users");
      return res.data;
    },
  });

  //   const { mutate } = useMutation({
  //     mutationKey: ["user"],
  //     mutationFn: (id, roleData) => {
  //       return axiosSecure.patch(`/set-user-role/${id}`, roleData);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["users"] });

  //       toast.success("User role has been updated successfully.");
  //     },
  //   });

  const [selectedRoles, setSelectedRoles] = useState({});

  const handleRoleChange = async (userId, newRole) => {
    try {
      setSelectedRoles((prevRoles) => ({
        ...prevRoles,
        [userId]: newRole,
      }));

      const res = await axiosSecure.patch(`/set-user-role/${userId}`, {
        role: newRole,
      });
      console.log(res.data);
      refetch();
      toast.success("User role has been updated successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="overflow-x-auto">
        {/* {isLoading && <p className="text-center mb-10">Loading...</p>} */}
        {user && isAdmin && (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((newUser) => (
                <tr key={newUser?._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          {newUser?.image && <img src={newUser?.image} />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium ">{newUser?.name}</td>
                  <td className="font-medium ">{newUser?.email}</td>
                  <td className="font-bold ">{newUser?.role}</td>

                  <th>
                    <select
                      disabled={newUser.role === "admin"}
                      className="select select-bordered w-full max-w-xl"
                      onChange={(e) =>
                        handleRoleChange(newUser._id, e.target.value)
                      }
                      value={selectedRoles[newUser._id] || "default"}
                    >
                      <option value={"default"}>Set new role</option>

                      {roles?.map((role, idx) => (
                        <option
                          key={idx}
                          value={role}
                          className="uppercase btn text-left"
                        >
                          {role}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th>
                    <button
                      //   onClick={() => handleDelete(newUser?._id)}
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

ManageUsers.propTypes = {};

export default ManageUsers;
