import React from "react";
import { Swiper } from "swiper";
import Category from "./Category";
import "../../assets/styles/popularCategorySwiper.css";

const PopularCategoty = () => {
  return (
    <div className="swiper-slide-popualr">
      <swiper-container
        class="mySwiper"
        navigation="true"
        freemode="true"
        space-between="70"
        slides-per-view="6"
        css-mode="true"
        loop="true"
      >
        <swiper-slide>
          <Category
            title={`لپ تاپ`}
            cover={`Asus-ROG-Strix-Scar-16-2023-1-1500x1500_prev_ui.png`}
            route={`/category/laptop`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            لپ تاپ
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کیس`}
            cover={`MSI-MEG-Trident-X2-13th-1-1500x1500_prev_ui.png`}
            route={`/category/case`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کیس
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کولر پردازنده`}
            cover={`NZXT-Kraken-Z53-RGB-Matte-Black-1-1500x1500_prev_ui.png`}
            route={`/category/Cooler`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کولر پردازنده
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کیبورد`}
            cover={`Razer-Deathstalker-V2-Pro-1-1500x1500_prev_ui.png`}
            route={`/category/keyboard`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کیبورد
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`موس`}
            cover={`razer-naga-v2-hyperspeed-black-v2-1-1500x1500_prev_ui.png`}
            route={`/category/mouse`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            موس
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`هدست`}
            cover={`ROG-Fusion-II-500-6-1500x1500_prev_ui.png`}
            route={`/category/headset`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            هدست
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>

        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>
        <swiper-slide>
          <Category
            title={`کنسول بازی`}
            cover={`Sony-PlayStation-5-Marvel’s-Spider-Man-2-Limited-Edition-1500x1500_prev_ui.png`}
            route={`/category/playconsole`}
          />

          <span className=" text-text-color font-normal transition-all duration-300">
            کنسول بازی
          </span>
        </swiper-slide>
      </swiper-container>
    </div>
  );
};

export default PopularCategoty;
