import React from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useSingleContest from "../../hooks/useSingleContest";

const Payment = (props) => {
  const { id } = useParams();
  const contest = useSingleContest(id);
  console.log(contest);
  return <div>payment</div>;
};

Payment.propTypes = {};

export default Payment;
