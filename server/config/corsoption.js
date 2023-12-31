import allowedOrigin from "./alloworigin.js";

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      throw new Error("Not allowed origin");
    }
  },

  optionSuccessStatus: 200,
};

export default corsOption;
