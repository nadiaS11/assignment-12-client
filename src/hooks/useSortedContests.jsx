import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useState } from "react";

const useSortedContests = () => {
  const [search, setSearch] = useState("");
  // console.log(search);
  const axiosPublic = useAxiosPublic();
  const { data: contests = [] } = useQuery({
    queryKey: ["contests", search, setSearch],
    queryFn: async () => {
      const res = await axiosPublic(
        `/contests?tags=${search}&sortField=participationCount&sortOrder=desc`
      );
      // console.log("API Response:", res.data);

      return res.data;
    },
  });
  return [setSearch, contests];
};

export default useSortedContests;
