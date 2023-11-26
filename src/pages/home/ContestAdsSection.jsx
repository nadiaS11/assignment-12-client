import React from "react";
import PropTypes from "prop-types";
import ContestAds from "./ContestAds";
import useSortedContests from "../../hooks/useSortedContests";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ContestAdsSection = () => {
  const [, contests] = useSortedContests();
  return (
    <div>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        className="mySwiper"
      >
        {contests?.map((contest, idx) => (
          <SwiperSlide key={idx}>
            <ContestAds contest={contest}></ContestAds>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

ContestAdsSection.propTypes = {};

export default ContestAdsSection;
