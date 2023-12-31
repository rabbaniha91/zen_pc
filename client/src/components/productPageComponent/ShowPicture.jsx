import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../../assets/styles/productspicturesswiper.css";

const ShowPicture = ({ pictures }) => {
  return (
    <div className="product-pictures-swiper">
      <swiper-container
        className="mySwiper"
       
        navigation="true"
        space-between="30"
        slides-per-view="1"
        css-mode="true"
        loop="true"
        zoom="true"
      >
        {pictures?.length > 0 &&
          pictures?.map((picture, index) => (
            <swiper-slide key={index}>
              <div class="swiper-zoom-container">
                <img src={picture} alt="" />
              </div>
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
};

export default ShowPicture;
