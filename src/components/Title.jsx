import React from "react";
import PropTypes from "prop-types";

const Title = ({ children }) => {
  return (
    <div className="mb-10 flex flex-col border-b-4 border-slate-800   md:flex-row">
      <h2 className=" mb-4 text-4xl font-semibold lg:text-3xl">
        <span className=" text-yellow-600  ">{children}</span>
      </h2>
    </div>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
