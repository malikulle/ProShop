import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MySpinner from "../components/Spinner";
import { LinkContainer } from "react-router-bootstrap";
import { deleteProduct, listProducts } from "../actions/productActions";
import axios from "axios";
import alertify from "alertifyjs";

const ProductListScreen = () => {
  const dispatch = useDispatch();

  const { productList, productDelete } = useSelector((state) => ({
    productList: state.productList,
    productDelete: state.productDelete,
  }));

  const { products, loading } = productList;
  const { success } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = async () => {
    try {
      await axios.post("/api/products");
      alertify.success("Product Added Successfully");
      dispatch(listProducts());
    } catch (error) {
      alertify.error(error.response.data.error);
    }
  };

  if (loading) {
    return <MySpinner />;
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="btn-sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductListScreen;
