import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { imgUpload } from "../api/utils";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import useAuth from "./../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const upload = await imgUpload(data?.image[0]);
    const imgUrl = upload.data?.display_url;
    const user = {
      name: data?.name,
      email: data?.email,
      image: imgUrl,
      role: "user",
    };
    console.log(user, data.password);

    try {
      const newUser = await createUser(data?.email, data?.password);
      console.log(newUser);

      const res = await axiosPublic.put("/users", user);
      console.log(res);

      await updateUserProfile(data?.name, imgUrl);

      toast.success("Successfully registered.");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" mt-20 max-w-xl  mx-auto min-h-screen">
      <h2 className="font-semibold text-4xl text-center">Sign Up </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-xl mx-auto gap-10 mt-12"
      >
        <div className="flex flex-col gap-2">
          <input
            type="file"
            {...register("image", {
              required: true,
              maxLength: 1,
            })}
            className="file-input file-input-bordered rounded"
          />
          {errors?.image?.type === "required" && <p>This field is required</p>}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            {...register("name", {
              required: true,
            })}
            className="input input-bordered rounded"
            placeholder="Your name "
          />
          {errors?.name?.type === "required" && <p>This field is required</p>}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input input-bordered rounded"
            placeholder="Your email address"
          />
          {errors?.firstName?.type === "required" && (
            <p>This field is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
              pattern: /^(?=.*?[!@#$&*~])(?=.*[A-Z]).{8,}$/,
            })}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="input input-bordered rounded"
          />{" "}
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              Password must have at least one special character and One capital
              letter.
            </span>
          )}
        </div>
        <input
          type="submit"
          value={"Sign Up"}
          className="btn btn-block bg-slate-800 text-white hover:bg-slate-600"
        />
      </form>
      <h4 className=" mt-4 font-medium">
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-500">
          Sign In
        </Link>{" "}
      </h4>
    </div>
  );
};

Register.propTypes = {};

export default Register;
