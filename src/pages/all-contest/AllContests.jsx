import React from "react";
import PropTypes from "prop-types";
import useSortedContests from "../../hooks/useSortedContests";
import ContestCard from "../../components/shared/ContestCard";

const AllContests = () => {
  const contests = useSortedContests();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-32 gap-x-10 gap-y-8 mx-auto">
      {contests?.map((contest) => (
        <ContestCard key={contest._id} contest={contest} />
      ))}
    </div>
  );
};

AllContests.propTypes = {};

export default AllContests;
