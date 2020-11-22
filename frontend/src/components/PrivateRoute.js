import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...otherProps}
      render={(props) =>
        userInfo.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/accessdenied" />
        )
      }
    />
  );
};

export default PrivateRoute;
