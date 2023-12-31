import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer";
import Slider from "../components/homeComponents/Slider";
import MiddleComponent from "../components/homeComponents/MiddleComponent";
import Offers from "../components/homeComponents/Offers";
import PopularSection from "../components/homeComponents/PopularSection";
import { motion } from "framer-motion";
import PopularCategoty from "../components/homeComponents/PopularCategoty";

const Home = ({ dark, setDark, slider }) => {
  const cardVariants = {
    offScreen: {
      y: 300,
      rotate: -30,
    },
    onScreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <div className="home-container">
        <Slider slider={slider} />
        <MiddleComponent />
        <Offers />
        <motion.div
          variants={cardVariants}
          initial="offScreen"
          whileInView="onScreen"
          className="popularSection-container"
        >
          <PopularSection
            title={`مانیتورهای محبوب`}
            cover={`samsung-odyssey-ark-n3-1500x1500_prev_ui.png`}
          />
          <PopularSection
            title={`کارت گرافیک های محبوب`}
            cover={`gigabyte-aorus-rtx-4090-master-24g-4-1500x1500_prev_ui.png`}
          />
        </motion.div>
      </div>
      <div className="h-[230px] py-5">
        <PopularCategoty />
      </div>
      <Footer dark={dark} />
    </div>
  );
};

export default Home;
