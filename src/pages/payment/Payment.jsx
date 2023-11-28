import React from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useSingleContest from "../../hooks/useSingleContest";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Payment = (props) => {
  const { id } = useParams();
  const contest = useSingleContest(id);
  console.log(contest);
  return (
    <div>
      {" "}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

Payment.propTypes = {};

export default Payment;
