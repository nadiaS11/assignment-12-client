import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSingleContest = (id) => {
  console.log(id);
  const axiosPublic = useAxiosPublic();
  const { data: contest = {} } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic(`/contests/${id}`);
      console.log(res.data, "inside single contest");
      return res.data;
    },
  });
  return contest;
};

export default useSingleContest;
