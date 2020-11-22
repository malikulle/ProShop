import React, { useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import MySpinner from "../components/Spinner";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match, location }) => {
  const keyword = match.params.keyword;

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, pages, page } = productList;
  let pageRoute = null;
  if (location.search) {
    pageRoute = location.search.split("=")[1];
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(keyword, pageRoute));
  }, [dispatch, keyword, pageRoute]);

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
  return (
    <>
      <ProductCarousel />
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
