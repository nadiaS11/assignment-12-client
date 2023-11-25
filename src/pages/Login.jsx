import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className=" mt-20   mx-auto min-h-screen">
      <h2 className="font-semibold text-4xl text-center">Log in </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col max-w-xl mx-auto gap-10 mt-12"
      >
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
          placeholder="Your email address"
          className="input input-bordered rounded"
        />
        {errors.email && (
          <span className="text-red-600">Email is required</span>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", {
            min: 8,
            pattern: /^[A-Za-z]+$/i,
            required: true,
          })}
          className="input input-bordered rounded"
        />{" "}
        {errors.password?.type === "required" && (
          <span className="text-red-600">Password is required</span>
        )}
        <input
          type="submit"
          value={"Log In"}
          className="btn btn-block bg-slate-800 text-white text-xl font-semibold"
        />
      </form>
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
