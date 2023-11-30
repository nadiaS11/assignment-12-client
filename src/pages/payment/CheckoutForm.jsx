import PropTypes from "prop-types";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { CreatePaymentIntent } from "../../api/contestPay";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ contest }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  //create payment intent
  useEffect(() => {
    const clientSecretInfo = {
      price: contest?.contestPrice ? contest?.contestPrice : 50,
    };

    if (clientSecretInfo.price > 0) {
      CreatePaymentIntent({ price: clientSecretInfo.price }).then((data) => {
        // console.log(data);
        // console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
    }
  }, [contest, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pay");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("payment method", paymentMethod);
    }
    setProcessing(true);

    // const { paymentIntent, error: confirmError } = await stripe.confirmPayment(
    //   clientSecret,
    //   {
    //     paymentMethod: {
    //       card: card,
    //       billing_details: {
    //         email: user?.email || "nadia@gmail.com",
    //         name: user?.displayName || "nadia",
    //       },
    //     },
    //   }
    // );
    // confirm payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }
    console.log("payment intent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        contestName: contest.contestName,
        creator: contest.creator ? contest.creator : "saraf@gmail.com",
        contestDetails: contest.contestDetails,
        image: contest.image,
        deadline: contest.deadline,
        price: contest?.contestPrice ? contest?.contestPrice : 50,
        participant: user?.email,
        transactionId: paymentIntent.id,
        payDate: new Date(),
      };
      console.log(paymentInfo);

      try {
        const savePayment = await axiosSecure.post(
          "/user-payments",
          paymentInfo
        );
        console.log(savePayment.data);
        //update participationCount
        const increaseParticipants = await axiosSecure.patch(
          `/contest/${contest?._id}`,
          contest
        );
        console.log(increaseParticipants.data);

        toast.success("Successfully registered for the contest.");
        navigate("/dashboard/participated-contest");
      } catch (err) {
        console.log(err.message);
      } finally {
        setProcessing(false);
      }
    }
    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg pt-32 flex flex-col justify-center"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-error text-center text-xl text-white"
      >
        {processing ? (
          <TbFidgetSpinner />
        ) : (
          `Pay $${contest.contestPrice ? contest.contestPrice : 50}`
        )}
      </button>
    </form>
  );
};
CheckoutForm.propTypes = {
  contest: PropTypes.object,
};

export default CheckoutForm;
