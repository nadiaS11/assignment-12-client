import React from "react";
import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname
    ? location?.state?.from?.pathname
    : "/";

  const axiosPublic = useAxiosPublic();
  const { googleLogin } = useAuth();
  const handleGoogle = async () => {
    try {
      const { user } = await googleLogin();
      console.log(user.displayName);

      const saveUser = await axiosPublic.put("/users", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      console.log(saveUser);
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      onClick={handleGoogle}
      className="btn btn-block bg-white border-slate-800 text-slate-800 hover:btn-ghost  text-lg mt-4"
    >
      <FcGoogle size={"1.6rem"} /> Continue With Google
    </button>
  );
};

GoogleButton.propTypes = {};

export default GoogleButton;
