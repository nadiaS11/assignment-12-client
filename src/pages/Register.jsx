import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className=" mt-20 max-w-xl  mx-auto min-h-screen">
      <h2 className="font-semibold text-4xl text-center">Sign Up </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="flex flex-col max-w-xl mx-auto gap-10 mt-12"
      >
        <input
          type="file"
          name="image"
          {...register("image", { required: true, maxLength: 1 })}
          className=" file-input file-input-bordered file-input-md   rounded"
        />
        <input
          {...register("name", { required: true })}
          id="name"
          name="name"
          type="name"
          required
          className=" file-input file-input-bordered file-input-md   rounded"
          placeholder="Your full name here"
        />{" "}
        {errors.name && (
          <span className="text-red-600">This field is required</span>
        )}
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
          value={"Sign Up"}
          className="btn btn-block bg-slate-800 text-white text-xl font-semibold"
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
