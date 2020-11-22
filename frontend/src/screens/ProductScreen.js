import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Alert,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../actions/productActions";
import MySpinner from "../components/Spinner";
import alertify from "alertifyjs";
import Moment from "react-moment";
import Api from "../api/api";
import Axios from "axios";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { productDetail, userLogin } = useSelector((state) => ({
    productDetail: state.productDetail,
    userLogin: state.userLogin,
  }));
  const { loading, error, product } = productDetail;
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      alertify.error("Please Provide a Comment");
      return;
    }
    try {
      const { data } = await Axios.post(`/api/products/${id}/reviews`, {
        rating,
        comment,
      });
      if (data.success) {
        alertify.success("Review Added");
        dispatch(getProductById(id));
      }
    } catch (error) {
      alertify.error(error.response.data.error);
    }
  };

  if (loading) {
    return <MySpinner />;
  }
  if (error) {
    return (
      <Alert variant="danger">
        <p>{error}</p>
      </Alert>
    );
  }
  if (!product.name) {
    return (
      <Alert variant="danger">
        <p>Product Not Found</p>
      </Alert>
    );
  }
  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={Api.baseUrl + "/public" + product.image}
            alt={product.name}
            fluid
          />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>Decription : ${product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>$ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status :</Col>
                  <Col>
                    {product.countInStock > 0 ? " In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty :</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="btn-block"
                  type="button"
                >
                  Add To Card
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3 className="mt-2">Reviews</h3>
          {product.reviews.length === 0 && (
            <Alert variant="danger">No Review Found</Alert>
          )}
          <ListGroup variant="flush">
            {product.reviews.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>
                  <Moment format="YYYY-MM-DD">{review.createdAt}</Moment>
                </p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {userInfo ? (
                <Form onSubmit={addReviewHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select....</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Alert variant="danger">
                  Please <Link to="/login">sign in</Link> to write review{" "}
                </Alert>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
