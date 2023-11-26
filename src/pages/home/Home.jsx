import React from "react";
import PropTypes from "prop-types";
import Banner from "./Banner";
import PopularContests from "./PopularContests";
import ContestAds from "./ContestAds";
import useSortedContests from "../../hooks/useSortedContests";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ContestAdsSection from "./ContestAdsSection";
const Home = () => {
  const [setSearch, contests] = useSortedContests();
  return (
    <div>
      <Banner setSearch={setSearch}></Banner>
      <PopularContests contests={contests} />
      <ContestAdsSection />
    </div>
  );
};

Home.propTypes = {};

export default Home;
