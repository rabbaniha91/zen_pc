import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import authReducer from "./authReducer";
import getCetgoryReducer from "./getCategoryReducer";
import accessTokenReducer from "./newAccessTokenReducer";
import getDiscountReducer from "./getDiscountReducer";
import getProductsReducer from "./getProductsReducer";
import getProductReducer from "./getProduct";
import getCommentsReducer from "./getCommentsReducer";
import cartItemsReducer from "./cartItemsReducer";
import getShippingInfoReducer from "./getShippingInfo";

export default combineReducers({
  register: registerReducer,
  user: authReducer,
  category: getCetgoryReducer,
  newAccessToken: accessTokenReducer,
  discount: getDiscountReducer,
  products: getProductsReducer,
  product: getProductReducer,
  commentsInfo: getCommentsReducer,
  cartItems: cartItemsReducer,
  shipping: getShippingInfoReducer,
});
