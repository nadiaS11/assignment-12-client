import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import GoogleButton from "../components/shared/GoogleButton";

const Login = () => {
  const { user, signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname
    ? location?.state?.from?.pathname
    : "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const toastId = toast.loading("Logging...");

    try {
      const user = await signInUser(data?.email, data?.password);
      toast.success("Logged in successfully.", { id: toastId });
      navigate(
        location?.state?.from?.pathname ? location?.state?.from?.pathname : "/"
      );
    } catch (err) {
      console.log(err);
      toast.error(err.message, { id: toastId });
    }
  };
  return (
    <div className=" mt-20  max-w-xl mx-auto min-h-screen">
      <h2 className="font-semibold text-4xl text-center">Log in </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-xl mx-auto gap-10 mt-12"
      >
        <div className="flex flex-col gap-2">
          <input
            type="email"
            {...register("email", {
              required: true,
            })}
            className="input input-bordered rounded"
            placeholder="Your email address"
          />
          {errors?.email?.type === "required" && <p>This field is required</p>}
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
          value={"Log In"}
          className="btn btn-block bg-slate-800 text-white hover:bg-slate-600"
        />
      </form>
      <GoogleButton />
      <h2 className="font-semibold mt-4 text-xl text-center">
        Don't have an account?{" "}
        <Link to={"/register"} className="text-blue-500">
          Sing Up
        </Link>
      </h2>
    </div>
  );
};

Login.propTypes = {};

export default Login;
