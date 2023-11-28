import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const imgUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
    formData
  );
  return data;
};

export const clearCookie = async () => {
  const res = await axios.get("/logout");
  return res.data;
};
