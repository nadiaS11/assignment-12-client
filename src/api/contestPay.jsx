import useAxiosSecure from "../hooks/useAxiosSecure";

export const CreatePaymentIntent = async (price) => {
  const axiosSecure = useAxiosSecure();
  const { data } = await axiosSecure.post("/create-payment-intent", price);
  return data;
};

//save payment info

//update participationCount
