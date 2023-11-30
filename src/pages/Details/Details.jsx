import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FcCheckmark } from "react-icons/fc";
import Countdown from "react-countdown";
import useAuth from "./../../hooks/useAuth";
import useAdmin from "./../../hooks/useAdmin";
import useCreator from "../../hooks/useCreator";

const Details = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();
  const { loading } = useAuth();
  const { id } = useParams();
  console.log(id);
  const axiosPublic = useAxiosPublic();

  const { data: contest = {} } = useQuery({
    queryKey: ["contest"],
    queryFn: async () => {
      const res = await axiosPublic(`/contests/${id}`);
      return res.data;
    },
  });

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
    rules,
  } = contest;
  const Completionist = () => <span>Application Closed!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="flex gap-2 flex-wrap  ">
          {days} <small className="text-slate-800">d</small>: {hours}
          <small className="text-slate-800">h</small> : {minutes}
          <small className="text-slate-800">m</small> : {seconds}
          <small className="text-slate-800">s</small>
        </span>
      );
    }
  };

  // console.log(renderer);
  return (
    <section className="mx-auto max-w-screen-xl bg-white py-20 text-black  md:py-32">
      <div className="mx-auto px-6 sm:px-8 lg:px-12">
        <div className="row-gap-12 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="">
              <h2 className="font-sans text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                <span className="leading-snug text-yellow-600">
                  {contestName}
                </span>
              </h2>

              <p className="mt-4 text-lg text-gray-700">{contestDetails}</p>

              <div className="flex max-w-3xl items-center gap-8 font-medium mt-6">
                <p className="  text-lg text-gray-700">Contest Type: {tags}</p>
                <p className="  text-lg text-gray-700">
                  Participants: {participationCount}
                </p>
              </div>
            </div>

            <div className="group relative mt-8 w-full overflow-hidden rounded-xl hover:bg-slate-700">
              <div className="">
                <img
                  className="max-w-full object-cover hover:opacity-10 transition-all  duration-300 ease-in-out group-hover:opacity-40"
                  src={image}
                  alt=""
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {user && !isAdmin && !isCreator && (
                  <Link
                    to={`/payment/${id}`}
                    title=""
                    className="hidden group-hover:btn  "
                    role="button"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10 lg:pl-16">
            <div className="text-white">
              <div className="group relative mb-4 overflow-hidden rounded-md border bg-white py-10 px-8 text-black shadow-lg transition-all duration-200 ease-in-out">
                <div className="flex justify-center gap-4 p-2 flex-col md:flex-row lg:flex-col">
                  {!loading && (
                    <p className="mt-2    sm:text-2xl   sm:font-semibold btn    bg-yellow-600 text-white">
                      <Countdown date={deadline} renderer={renderer} />
                    </p>
                  )}
                  {user && !isAdmin && !isCreator && (
                    <Link
                      to={`/payment/${id}`}
                      className="mt-2   text-2xl font-semibold btn  border-yellow-600 text-yellow-600 bg-white"
                    >
                      Register for $
                      {contest.contestPrice ? contest.contestPrice : 50}
                    </Link>
                  )}
                </div>
              </div>

              <div className="group relative mb-4 overflow-hidden rounded-md border bg-white py-10 px-8 text-black shadow-lg transition-all duration-200 ease-in-out">
                <h3 className="text-xs uppercase font-bold">Awards</h3>
                <div>
                  <p className="mt-2 font-sans text-3xl font-bold">${award}</p>
                </div>

                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white px-10 text-black opacity-0 transition group-hover:opacity-100">
                  <h3 className="text-5xl select-none font-bold text-slate-700">
                    Get Ahead Of The Curve!
                  </h3>
                </div>
              </div>

              <div className="group relative mb-4 overflow-hidden rounded-md border  py-10 px-8 shadow-lg transition-all duration-200 ease-in-out">
                <h3 className="text-xs uppercase font-semibold text-black">
                  Previous Year Winner
                </h3>
                <p className="my-2 text-center  text-3xl font-bold text-slate-700 py-4">
                  {winnerName}
                </p>
                <figure className="w-full  ">
                  <img
                    className="object-cover  h-[75vh] lg:h-[50vh] w-3/4 rounded-badge mx-auto"
                    src={winnerImage}
                    alt=""
                  />
                </figure>
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white px-10 text-black opacity-0 transition group-hover:opacity-100">
                  <h3 className="text-5xl select-none font-bold text-yellow-600">
                    Get Featured Here!
                  </h3>
                </div>
              </div>

              <div className="group relative mb-4 overflow-hidden hover:scale-110 rounded-md border bg-black py-10 px-8 shadow-lg transition-all duration-200 ease-in-out">
                <h3 className="text-xs uppercase">Process</h3>
                <p className="mt-2 font-sans text-3xl font-bold">
                  Terms & Conditions
                </p>

                {rules?.map((rule, idx) => (
                  <p
                    key={idx}
                    className="mt-4 flex
                  gap-4 items-start
                  "
                  >
                    {idx + 1}
                    <span>{rule.text ? rule.text : rule}</span>
                  </p>
                ))}

                <div className="group-hover:cursor-pointer absolute top-0 left-0 flex h-full w-full items-center justify-center bg-slate-700 px-10 text-white opacity-0 transition group-hover:opacity-100">
                  <a href="#" className="text-5xl font-bold">
                    Get Started!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Details.propTypes = {};

export default Details;
