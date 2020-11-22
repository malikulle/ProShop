import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import MySpinner from "../components/Spinner";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import Moment from "react-moment";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const { orderDetails, orderPay, userLogin, orderDeliver } = useSelector(
    (state) => ({
      orderDetails: state.orderDetails,
      orderPay: state.orderPay,
      userLogin: state.userLogin,
      orderDeliver: state.orderDeliver,
    })
  );
  const { userInfo } = userLogin;
  const { loading, error, order } = orderDetails;
  const { loading: loadingPay, success: successPay } = orderPay;
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId, dispatch, successDeliver]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }
  }, [sdkReady, order, successPay, orderId, dispatch]);

  const paymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };
  const handleDeliverClick = (id) => {
    dispatch(deliverOrder(id));
  };
  if (loading) {
    return <MySpinner />;
  }
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row>
      <Col md={8}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Order {order._id}</h2>
            <strong>Name : </strong> {order.user.name}
            <p>
              {" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address : </strong>
              {order.shippingAddress.address} , {order.shippingAddress.city} ,{" "}
              {order.shippingAddress.postalCode} ,{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Alert variant="success">
                Delivered At <Moment format="YYYY-MM-DD">{order.deliveredAt}</Moment>
              </Alert>
            ) : (
              <Alert variant="danger">Not Delivered</Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong> Method : </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Alert variant="success">
                Paid on <Moment format="YYYY-MM-DD">{order.paidAt}</Moment>
              </Alert>
            ) : (
              <Alert variant="danger">Not Paid</Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Alert variant="danger"> Your order İs Empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fluid
                          rounded
                        ></Image>
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x $ {item.price} = {item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Sumary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shpiing</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && <Alert variant="danger">{error}</Alert>}
            </ListGroup.Item>
            {!order.isPad && (
              <ListGroup.Item>
                {loadingPay && <MySpinner />}
                {!sdkReady ? (
                  <MySpinner />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={paymentHandler}
                  ></PayPalButton>
                )}
              </ListGroup.Item>
            )}
            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={() => handleDeliverClick(order._id)}
                >
                  {loadingDeliver ? <MySpinner /> : " Mark As Delivered"}
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderScreen;
