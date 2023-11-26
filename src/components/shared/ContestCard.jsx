import React from "react";
import PropTypes from "prop-types";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const ContestCard = ({ contest }) => {
  //   console.log(
  //     Object.keys(contest)
  //       .map(function (k) {
  //         return k;
  //       })
  //       .join(",")
  //   );

  const {
    _id,
    contestName,
    image,
    participationCount,
    contestDetails,
    contestPrize,
    tags,
    award,
    deadline,
  } = contest;

  return (
    <div className="flex flex-col rounded border bg-white transition hover:bg-gray-200 ">
      <div className="">
        <img src={image} className="w-full h-52 object-cover" />
      </div>
      <div className="flex-1 p-4 flex-grow">
        <p className="mb-4 text-xs font-medium">
          Participants: {participationCount}
        </p>
        <p className="mb-4 text-xs font-medium">{tags}</p>
        <h6 className="mb-4 text-xl font-bold">{contestName}</h6>
        {/* <h6 className="mb-4  font-light">{contestDetails.slice(0, 100)}...</h6> */}
        <p className="mb-4 text-xs">
          Deadline: {moment(deadline).format("llll")}
        </p>
      </div>
      <div>
        <Link className="my-4 text-sm btn btn-sm rounded bg-yellow-500 ml-5">
          Details
        </Link>
      </div>
    </div>
  );
};

ContestCard.propTypes = {
  contest: PropTypes.object,
};

export default ContestCard;
