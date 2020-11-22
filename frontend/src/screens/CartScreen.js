import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Alert,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import Api from "../api/api"

const CartScreen = ({ match, location, history }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);


  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
    alertify.success("Item Removed")
  }
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }
 
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 && (
          <Alert variant="danger">
            <p>Your Cart is Empty</p>
          </Alert>
        )}
        {cartItems.length > 0 && (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={Api.baseUrl + "/public/" + item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                      <i style={{color : "red"}} className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>
              $ {cartItems.reduce((sum , item) => sum + item.qty * item.price ,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
