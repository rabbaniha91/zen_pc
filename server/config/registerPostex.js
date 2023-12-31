import axios from "axios";
import Postex from "../models/postex.js";

const CodeMeli = process.env.NATION_CODE_POSTEX;
const Username = process.env.USER_NAME_POSTEX;
const Password = process.env.PASSWORD_POSTEX;

const registerToPostex = async () => {
  try {
    let postex = await Postex.find().exec();
    if (postex.length === 0) {
      postex = new Postex({});
      postex.save();
    }

    if (postex[0].registred === false) {
      try {
        await axios.post(
          "https://postex.ir/api/customer/register",
          {
            CodeMeli,
            Username,
            Password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        postex[0].registred = true;

        await postex[0].save();
      } catch (error) {
        console.log("register postex error: ", error);
      }
    }else{
      console.log("register to postex");
    }
  } catch (error) {
    console.log("find postex model: ", error);
  }
};

export default registerToPostex;
