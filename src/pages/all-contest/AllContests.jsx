import React from "react";
import PropTypes from "prop-types";
import useSortedContests from "../../hooks/useSortedContests";
import ContestCard from "../../components/shared/ContestCard";
import Container from "./../../components/shared/Container";

const AllContests = () => {
  const [setSearch, contests] = useSortedContests();

  const tabs = [
    "Business Contest",
    "Medical Contest",
    "Article Writing",
    "Gaming",
  ];
  return (
    <div>
      <div
        style={{ backgroundImage: "url('./banner2.png')" }}
        className="bg-cover bg-center bg-no-repeat h-[50vh] bg-blend-overlay bg-black bg-opacity-50 flex flex-col items-start   justify-center  "
      >
        <Container>
          <h1 className="text-7xl   font-bold text-left mt-20 text-transparent   bg-clip-text bg-gradient-to-r from-slate-400 to-yellow-400">
            Contests
          </h1>
        </Container>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-32 gap-x-6 gap-y-8 mx-auto px-2">
        {contests?.map((contest) => (
          <ContestCard key={contest._id} contest={contest} />
        ))}
      </div>
    </div>
  );
};

AllContests.propTypes = {};

export default AllContests;
