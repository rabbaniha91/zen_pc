export const saveCartItemsToLocalStorage = (items) => {
  console.log(items);
  const prevCartItems = JSON.parse(localStorage.getItem("cart"));

  if (prevCartItems !== null) {
    const repeatProduct = prevCartItems.findIndex((product) => {
      return product.id === items?.id;
    });
    if (repeatProduct !== -1) {
      if (
        prevCartItems[repeatProduct].count <
        prevCartItems[repeatProduct].inventory
      ) {
        prevCartItems[repeatProduct].count += 1;
      }
    } else {
      prevCartItems.push(items);
    }
    localStorage.setItem("cart", JSON.stringify(prevCartItems));
  } else {
    localStorage.setItem("cart", JSON.stringify([items]));
  }
};

export const getCartItemsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

export const deleteCart = () => {
  localStorage.removeItem("cart");
};

export const getAllStates = async (axiosPrivate, signal) => {
  try {
    const response = await axiosPrivate.get("/user/getAllStates", { signal });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCityOfState = async (axiosPrivate, id, signal) => {
  try {
    const response = await axiosPrivate.get(`/user/getCityOfState/${id}`, {
      signal,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const enterNewAddress = async (axiosPrivate, address, signal) => {
  try {
    const { data } = await axiosPrivate.post(
      "/user/enternewaddress",
      { ...address },
      { signal }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editAddress = async (axiosPrivate, address, signal, id) => {
  try {
    const { data } = await axiosPrivate.post(
      `/user/editaddress/${id}`,
      { ...address },
      { signal }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletAddress = async (axiosPrivate, signal, id) => {
  try {
    const { data } = await axiosPrivate.delete(`/user/deleteaddress/${id}`, {
      signal,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};



export const postPrices = async (axiosprivate, formData) => {
  try {
    const { data } = await axiosprivate.post("/user/postprice", formData);
    return data;
  } catch (error) {
    console.log("Test err: ", error);
  }
};
