import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSortedContests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosPublic(
        "/contests?sortField=participationCount&sortOrder=desc"
      );
      return res.data;
    },
  });
  return contests;
};

export default useSortedContests;
