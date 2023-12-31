import React from "react";
import "../../../assets/styles/productpicturemobileversion.css";

const ProductPicture = ({ cover, pictures }) => {
  return (
    <>
      {pictures?.length > 0 && (
        <div className="product-picture-mobile-version">
          <swiper-container
            class="mySwiper"
            pagination="true"
            pagination-clickable="true"
            autoplay-delay="5000"
            autoplay-disable-on-interaction="false"
            space-between="30"
            slides-per-view="1"
            speed="500"
            css-mode="true"
            loop="true"
          >
            <swiper-slide>
              <img src={cover} alt="" />
            </swiper-slide>

            {pictures?.map((img, index) => (
              <swiper-slide key={index}>
                <img src={img} alt={img} />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      )}
    </>
  );
};

export default ProductPicture;
