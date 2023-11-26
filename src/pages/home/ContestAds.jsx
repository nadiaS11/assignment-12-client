import React from "react";
import PropTypes from "prop-types";

const ContestAds = ({ contest }) => {
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
    winnerName,
    winnerImage,
  } = contest;

  return (
    <div className="mx-auto max-w-5xl lg:max-w-screen-2xl flex flex-col-reverse md:flex-row items-center justify-between rounded-md lg:h-[70vh] my-20">
      <div className="mt-10 text-center lg:mb-0 lg:max-w-lg lg:text-left lg:ml-20">
        <div className="mb-6 max-w-xl">
          <div>
            <p className="bg-teal-accent-400 mb-4 inline-block rounded-full bg-green-200 px-3 py-px text-sm font-semibold tracking-wider text-green-900">
              Meet our winners
            </p>
          </div>
          <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
            {winnerName}
            <br />
            <span className=" mr-2">in</span>
            <span className="inline-block text-yellow-600">{tags}</span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg font-semibold">
            {contestName}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:justify-start">
          <div className=" inline-flex h-12 w-full items-center min-w-[15rem] justify-center rounded-full bg-yellow-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-yellow-500 focus:ring sm:w-auto">
            {award}
          </div>
        </div>
      </div>
      <div className="flex items-center  ">
        {/* <svg
          className="h-full w-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="img1" x="0" y="0" width="1" height="1">
              <image
                className="h-72  "
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="xMaxYMax  slice"
                href={winnerImage}
              />
            </pattern>
          </defs>

          <path
            fill="url(#img1)"
            d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,35.8C-57,27.5,-74,20.3,-82.1,7.7C-90.3,-4.8,-89.5,-22.7,-80.8,-34.8C-72,-46.9,-55.2,-53.3,-40.4,-60.2C-25.6,-67,-12.8,-74.3,0.6,-75.2C13.9,-76.1,27.9,-70.6,40,-62.6Z"
            transform="translate(100 100)"
          />
        </svg> */}
        <img
          style={{ borderRadius: "51% 80% 63% 36% / 69% 45% 57% 32% " }}
          className="w-[400px] h-[50vh] mx-auto  "
          src={winnerImage}
          alt=""
        />
      </div>
    </div>
  );
};

ContestAds.propTypes = {};

export default ContestAds;
