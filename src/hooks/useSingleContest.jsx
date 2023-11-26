import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useSingleContest = (id) => {
  const axiosPublic = useAxiosPublic();
  const { data: contest = {} } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic(`/contests/${id}`);
      return res.data;
    },
  });
  return contest;
};

export default useSingleContest;
