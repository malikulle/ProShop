import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AccessDenied from "./components/AccessDenied";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileSecreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentSecreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderSecreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const Routers = (props) => {
  return (
    <div>
      <PrivateRoute path="/admin/userlist" component={UserListScreen} exact />
      <PrivateRoute
        path="/admin/user/:id/edit"
        component={UserEditScreen}
        exact
      />
      <PrivateRoute
        path="/admin/product/:id/edit"
        component={ProductEditScreen}
        exact
      />
      <PrivateRoute
        path="/admin/productlist"
        component={ProductListScreen}
        exact
      />
      <PrivateRoute path="/admin/orderList" component={OrderListScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      <Route path="/search/:keyword" component={HomeScreen}  />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/cart/:id?" component={CartScreen} exact />
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/profile" component={ProfileScreen} exact />
      <Route path="/shipping" component={ShippingScreen} exact />
      <Route path="/payment" component={PaymentScreen} exact />
      <Route path="/placeorder" component={PlaceOrderScreen} exact />
      <Route path="/order/:id" component={OrderScreen} exact />
      <Route path="/accessdenied" component={AccessDenied} exact />
    </div>
  );
};

export default Routers;
