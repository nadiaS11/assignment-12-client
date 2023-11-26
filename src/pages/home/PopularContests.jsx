import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "./../../components/shared/Container";
import ContestCard from "./../../components/shared/ContestCard";

const PopularContests = ({ contests }) => {
  console.log("PopularContests Response:", contests);

  console.log(contests);
  return (
    <Container>
      {" "}
      <section className="mx-auto max-w-screen-lg px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-6  text-3xl sm:text-5xl">Popular Contests</div>
          <p className="max-w-xl mx-auto">
            Participate in the most attempted contests and win life altering
            awards and opportunities.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          {contests?.slice(0, 6).map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      </section>
    </Container>
  );
};

PopularContests.propTypes = {
  contests: PropTypes.array,
};

export default PopularContests;
