import { BarLoader } from "react-spinners";

const BLoader = ({ dark }) => {
  const override = {
    display: "block",
    margin: "0 auto",
    boderColor: "#f69463",
  };

  const darkOverride = {
    display: "block",
    margin: "0 auto",
    boderColor: "#439be8",
  };

  const color = dark ? "#439be8" : "#f69463";

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <BarLoader
        color={color}
        width="100%"
        speedMultiplier={1.3}
        height={8}
        cssOverride={dark ? darkOverride : override}
      />
    </div>
  );
};

export default BLoader;
