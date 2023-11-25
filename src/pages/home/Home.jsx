import React from "react";
import PropTypes from "prop-types";
import Banner from "./Banner";
import PopularContests from "./PopularContests";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PopularContests />
    </div>
  );
};

Home.propTypes = {};

export default Home;
