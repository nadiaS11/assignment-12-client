import React from "react";
import PropTypes from "prop-types";
import videoBg from "/video.mp4";

const Banner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="top-0  absolute left-0 h-full w-full bg-black bg-opacity-50  "></div>
      <video
        className="w-full h-screen object-cover "
        autoPlay
        loop
        muted
        playsInline
        src={videoBg}
      ></video>
      <div className=" w-full absolute text-white top-1/2 transform -translate-y-1/2 text-center ">
        <h1 className=" max-w-7xl mx-auto mb-16 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-slate-400 to-yellow-400">
          Ignite Creativity, Inspire Innovation, Celebrate Excellence!d
        </h1>
        <div className="join">
          <input
            className="input input-bordered   join-item "
            placeholder="Search"
          />
          <button className="btn join-item rounded-lg bg-slate-800 text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {};

export default Banner;
