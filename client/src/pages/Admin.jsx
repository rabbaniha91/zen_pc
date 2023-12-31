import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import axios from "../axios/axios";
import { dataURLToBlob } from "blob-util";

const Admin = ({ dark, setDark }) => {
  // const [stage, setStage] = useState(1);
  // const [head, setHead] = useState("");
  // const [title, setTitle] = useState("");

  // const [holdSubTitle, setHoldSubTitle] = useState([]);

  // let item = "";

  // const handleSendToServer = async () => {
  //   // Create a new subTitle object with the current subTitle's values
  //   const result = holdSubTitle.reduce((acc, obj) => {
  //     const foundObj = acc.find((item) => item.title === obj.title);
  //     if (foundObj) {
  //       foundObj.subTitle = [
  //         ...new Set([...foundObj.subTitle, ...obj.subTitle]),
  //       ];
  //     } else {
  //       acc.push(obj);
  //     }
  //     return acc;
  //   }, []);
  //   const category = {
  //     head: head,
  //     items: [...result],
  //   };
  //   console.log(category);
  //   const { data } = await axios.post(
  //     "admin/entercategory",
  //     { ...category },
  //     {
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );

  //   console.log(data);
  //   setHoldSubTitle([]);
  //   setStage(1);
  // };
  // let items = [];

  let picture = "";
  let title = "";
  let content = "";
  const [slidPicture, setSlidPicture] = useState("");

  const handlePictureChange = (file) => {
    const picture = file[0];
    const reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = (readerEvent) => {
      setSlidPicture(readerEvent.target.result);
    };
  };

  const uploadSlidPicture = async () => {
    try {
      const blobPicture = dataURLToBlob(slidPicture);
      const path = "/sliderImages";
      const formData = new FormData();
      formData.append("path", path);
      formData.append("file", blobPicture);

      const { data } = await axios.post("/admin/productimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      picture = data.images[0].url;
      console.log(data.images[0].url);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    uploadSlidPicture();
  }, [slidPicture]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await axios.post(
        "/admin/slider",
        {
          picture,
          title,
          content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log("Error Sile: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>تصویر</label>
          <input
            type="file"
            accept="image/jpeg image/png"
            onChange={(e) => handlePictureChange(e.target.files)}
          />
        </div>
        <div>
          <label>عنوان</label>
          <input type="text" onChange={(e) => (title = e.target.value)} />
        </div>
        <div>
          <label>متن</label>
          <input type="text" onChange={(e) => (content = e.target.value)} />
        </div>
        <button type="submit">ارسال</button>
      </form>
    </div>
    // <div>
    //   <Header dark={dark} setDark={setDark} />
    //   <div className="flex flex-col space-y-5 mt-[132px] text-center pt-10">
    //     <span>اضافه کردن دسته بندی</span>
    //     <div className="flex items-center justify-center">
    //       {stage === 1 && (
    //         <span className="flex justify-center items-center w-full">
    //           <input
    //             type="text"
    //             placeholder="دسته"
    //             className="pr-3 py-4 rounded-md w-[60%]"
    //             onBlur={(e) => {
    //               setHead(e.target.value);
    //             }}
    //           />
    //           <button
    //             onClick={() => {
    //               setStage(2);
    //             }}
    //             className="px-4 py-4 cursor-pointer rounded-lg bg-[#f69463] hover:bg-[#dd8356] shadow-md
    //      transition-colors font-semibold mr-3"
    //           >
    //             ثبت
    //           </button>
    //         </span>
    //       )}
    //       {stage === 2 && (
    //         <span className="flex justify-center items-center w-full">
    //           <input
    //             id="categoryInput"
    //             type="text"
    //             placeholder="زیر دسته"
    //             className="pr-3 py-4 rounded-md w-[55%]"
    //             onBlur={(e) => {
    //               setTitle(e.target.value);
    //               setStage(3);
    //             }}
    //           />
    //           <button
    //             className="px-4 py-4 cursor-pointer rounded-lg bg-[#f69463] hover:bg-[#dd8356] shadow-md
    //      transition-colors font-semibold mr-3"
    //           >
    //             ثبت
    //           </button>
    //         </span>
    //       )}
    //       {stage === 3 && (
    //         <span className="flex justify-center items-center w-full">
    //           <input
    //             type="text"
    //             placeholder="آیتم ها"
    //             className="pr-3 py-4 rounded-md w-[60%]"
    //             onBlur={(e) => {
    //               item = e.target.value;
    //               e.target.value = "";
    //             }}
    //           />
    //           <button
    //             className="px-4 py-4 cursor-pointer rounded-lg bg-[#f69463] hover-bg-[#dd8356] shadow-md
    //      transition-colors font-semibold mr-3"
    //             onClick={() => {
    //               items.push(item);
    //               const newObj = {
    //                 title: title,
    //                 subTitle: [...items],
    //               };
    //               setHoldSubTitle([...holdSubTitle, newObj]);
    //             }}
    //           >
    //             ثبت
    //           </button>
    //           <button
    //             className="px-4 py-4 cursor-pointer rounded-lg bg-[#f69463] hover-bg-[#dd8356] shadow-md
    //      transition-colors font-semibold mr-3"
    //             onClick={() => {
    //               items = [];
    //               setStage(2);
    //             }}
    //           >
    //             قبلی
    //           </button>
    //           <button
    //             className="px-4 py-4 cursor-pointer rounded-lg bg-[#f69463] hover-bg-[#dd8356] shadow-md
    //      transition-colors font-semibold mr-3"
    //             onClick={handleSendToServer}
    //           >
    //             ارسال
    //           </button>
    //         </span>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Admin;
