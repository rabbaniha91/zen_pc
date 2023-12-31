import React, { createContext, useContext, useEffect, useState } from "react";
import { getCartItemsFromLocalStorage } from "../utilities/shoppingCart";

const stateContext = createContext();

const ContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartlength, setCartLength] = useState(0);

  useEffect(() => {
    const shoppingCartItems = getCartItemsFromLocalStorage();
    if (shoppingCartItems !== null) {
      setCartItems(shoppingCartItems)
      setCartLength(shoppingCartItems?.length);
    }
  }, []);

  return (
    <stateContext.Provider value={{cartlength, setCartLength, cartItems, setCartItems}}>{children}</stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);

export default ContextProvider;
