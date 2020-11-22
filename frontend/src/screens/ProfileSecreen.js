import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../actions/userActions";
import MySpinner from "../components/Spinner";
import alertify from "alertifyjs";
import { getMyOrders } from "../actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const { userDetails, userLogin, orderListMy } = useSelector((state) => ({
    userDetails: state.userDetails,
    userLogin: state.userLogin,
    orderListMy: state.orderListMy,
  }));
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails());
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitHanlder = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserDetails(name, email, password));
      alertify.success("Updated Successfully");
    }
  };

  return (
    <Row>
      <Col md={3}>
        {error && (
          <Alert variant="danger">
            <p>{error}</p>
          </Alert>
        )}
        {message && (
          <Alert variant="danger">
            <p>{message}</p>
          </Alert>
        )}
        <h2>User Profile</h2>
        <Form onSubmit={submitHanlder}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <MySpinner /> : "Submit"}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrders ? (
          <MySpinner />
        ) : errorOrders ? (
          <Alert variant="danger">{errorOrders}</Alert>
        ) : (
          <div>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="ligth">Details</Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
