import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Title from "../../Title";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import useSortedContests from "../../../hooks/useSortedContests";
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

const WinningContest = () => {
  const { user } = useAuth();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [, contests] = useSortedContests();
  const axiosSecure = useAxiosSecure();
  const { data: wins = [] } = useQuery({
    queryKey: ["wins"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contest-won-by-user?winnerEmail=${user?.email}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <Title>Total Contest Won: {wins?.length}</Title>
      <div className="flex flex-col max-w-md justify-center">
        {wins?.map((contest) => (
          <div key={contest._id} className=" ">
            <motion.div
              initial={false}
              animate={
                isLoaded && isInView
                  ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
            >
              <img
                onLoad={() => setIsLoaded(true)}
                alt=" "
                src={
                  contests.find((cont) => cont.contestName === contest._id)
                    ?.image
                }
                className=" "
              />
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

WinningContest.propTypes = {};

export default WinningContest;
