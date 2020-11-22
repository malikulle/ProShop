import { combineReducers } from "redux";
import { cartReducer } from "../reducers/cartReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "../reducers/orderReducers";
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productTopRatedReducer,
} from "../reducers/productReducers";
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdatePofileReducer,
  userSingleReducer,
  userUpdateReducer,
} from "../reducers/userReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdatePofileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userSingle: userSingleReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  productTop: productTopRatedReducer,
});

export default rootReducers;
