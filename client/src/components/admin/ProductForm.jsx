import React, { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { dataURLToBlob } from "blob-util";
import { data } from "./data";

const ProductForm = () => {
  const [titles, setTitles] = useState(false);
  const [cover, setCover] = useState("");
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    offer: 0,
    producer: "",
    generalCategory: "",
    subCategory: "",
    mainCategory: "",
    model: "",
    keyFeatures: [],
    cover: "",
    pictures: [],
    featuresTitle: [],
    featuresValue: [],
  });

  let head = "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverChange = (value) => {
    const reader = new FileReader();
    reader.readAsDataURL(value[0]);
    reader.onload = (readerEvent) => {
      setCover(readerEvent.target.result);
    };
  };

  const handlePicturesChange = (value) => {
    let files = Array.from(value);
    files.forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setPictures((pictures) => [...pictures, readerEvent.target.result]);
      };
    });
  };
  useEffect(() => {
    if (cover) {
      handleUplaodCover();
    }
  }, [cover]);

  useEffect(() => {
    if (pictures.length !== 0) {
      handleUplaodPictures();
    }
  }, [pictures]);

  const handleUplaodCover = async () => {
    try {
      let productCover = dataURLToBlob(cover);
      const path =
        `${formData.generalCategory}/${formData.subCategory}/${formData.mainCategory}/${formData.title}/cover` ||
        "test";
      let coverData = new FormData();
      coverData.append("path", JSON.stringify(path));
      coverData.append("file", productCover);
      const { data } = await axios.post("/admin/productimage", coverData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({ ...formData, cover: data.images[0] });
      console.log("Cover")
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleUplaodPictures = async () => {
    try {
      const uploadPictures = pictures.map((img) => dataURLToBlob(img));
      let path = `${formData.generalCategory}/${formData.subCategory}/${formData.mainCategory}/${formData.title}/pictures`;
      let pictureData = new FormData();
      pictureData.append("path", JSON.stringify(path));
      uploadPictures.forEach((img) => {
        pictureData.append("file", img);
      });

      const { data } = await axios.post("/admin/productimage", pictureData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFormData({ ...formData, pictures: [...data.images] });
      console.log("Picture")
    } catch (error) {}
  };

  const handleKeyFeaturesChange = (index, field, value) => {
    const updatedKeyFeatures = [...formData.keyFeatures];
    updatedKeyFeatures[index][field] = value;
    setFormData({ ...formData, keyFeatures: updatedKeyFeatures });
  };
  const handleFeaturesValueChange = (index, field, value) => {
    const updatedFeaturesValue = [...formData.featuresValue];
    updatedFeaturesValue[index][field] = value;
    updatedFeaturesValue[index]["index"] =
      formData.featuresTitle.indexOf(query);
    setFormData({ ...formData, featuresValue: updatedFeaturesValue });
  };

  const handleFeaturesTitle = (value) => {
    const updatedFeaturesTitle = [...formData.featuresTitle];
    updatedFeaturesTitle.push(value);
    setFormData({ ...formData, featuresTitle: updatedFeaturesTitle });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(formData);
    try {
      const response = await axios.post("/admin/createproduct", data);
      console.log("Product created:", response.data);
      // تا اینجا می‌توانید اطلاعات ایجاد شده را بررسی کنید یا اقدامات دیگری انجام دهید.
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Offer:</label>
        <input
          type="number"
          name="offer"
          value={formData.offer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Producer:</label>
        <input
          type="text"
          name="producer"
          value={formData.producer}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>General Category:</label>
        <input
          type="text"
          name="generalCategory"
          value={formData.generalCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Sub Category:</label>
        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Main Category:</label>
        <input
          type="text"
          name="mainCategory"
          value={formData.mainCategory}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Cover:</label>
        <input
          type="file"
          accept="image/jpeg iamge/png image/webp"
          name="cover"
          onChange={(e) => handleCoverChange(e.target.files)}
        />
      </div>
      <div>
        <label>Pictures (comma-separated):</label>
        <input
          type="file"
          accept="image/jpeg iamge/png image/webp"
          name="pictures"
          multiple
          onChange={(e) => handlePicturesChange(e.target.files)}
        />
      </div>
      <div>
        <label>Key Features:</label>
        {formData.keyFeatures.map((feature, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={feature.title}
              onChange={(e) =>
                handleKeyFeaturesChange(index, "title", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Feature Value"
              value={feature.featureValue}
              onChange={(e) =>
                handleKeyFeaturesChange(index, "featureValue", e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              keyFeatures: [
                ...formData.keyFeatures,
                { title: "", featureValue: "" },
              ],
            })
          }
        >
          Add Key Feature
        </button>
      </div>
      <div>
        <label>features Title</label>

        <div>
          <input
            type="text"
            placeholder="Features Title"
            onChange={(e) => (head = e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            handleFeaturesTitle(head);
          }}
        >
          Add features Title
        </button>
        <button type="button" onClick={() => setTitles(true)}>
          confrim
        </button>
      </div>
      <div>
        <label>Features Value:</label>
        {titles && (
          <select
            name=""
            id=""
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          >
            <option value="">------</option>
            {formData.featuresTitle.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
        {formData.featuresValue.map((feature, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={feature.title}
              onChange={(e) =>
                handleFeaturesValueChange(index, "title", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Feature Value"
              value={feature.featureValue}
              onChange={(e) =>
                handleFeaturesValueChange(index, "featureValue", e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              featuresValue: [
                ...formData.featuresValue,
                { title: "", featureValue: "" },
              ],
            })
          }
        >
          Add Features value
        </button>
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;
