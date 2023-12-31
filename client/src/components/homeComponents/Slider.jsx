import React from "react";
import { RingLoader } from "react-spinners";
import "../../assets/styles/sliderSwiper.css";

const Slider = React.memo(({ slider }) => {
  return (
    <>
      <div className=" slider-container">
        {slider?.length === 0 ? (
          <div className=" loader">
            <RingLoader size={84} />
          </div>
        ) : (
          <>
            <swiper-container
              class="mySwiper"
              pagination="true"
              pagination-clickable="true"
              navigation="true"
              autoplay-delay="5000"
              autoplay-disable-on-interaction="false"
              space-between="30"
              slides-per-view="1"
              speed="500"
              css-mode="true"
              loop="true"
            >
              {slider?.map((slide) => (
                <swiper-slide key={slide?.title}>
                  <img src={slide?.picture} alt="" />
                </swiper-slide>
              ))}
            </swiper-container>
          </>
        )}
      </div>
    </>
  );
});

export default Slider;
