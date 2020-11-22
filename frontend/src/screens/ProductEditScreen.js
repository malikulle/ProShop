import React, { useEffect, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import axios from "axios";
import alertify from "alertifyjs";
import MySpinner from "../components/Spinner";
import Api from "../api/api"
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.data.name);
        setPrice(data.data.price);
        setImage(data.data.image);
        setBrand(data.data.brand);
        setCategory(data.data.category);
        setCountInStock(data.data.countInStock);
        setDescription(data.data.description);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alertify.error("Product Not Found");
      }
    };
    getProduct();
  }, [productId]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const submitHanlder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put("/api/products", {
        id: productId,
        name,
        price,
        image,
        brand,
        countInStock,
        category,
        description,
      });
      if (data.success) {
        alertify.success("Product Updated Successfully");
      }
    } catch (error) {
      alertify.error(error.response.data.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await axios.post("/api/uploads", formData);
      setImage(data);
    } catch (error) {
      alertify.error(error.data.response.error);
    }
    setUploading(false);
  };
  if (loading) {
    return <MySpinner />;
  }

  return (
    <div>
      <Link to="/admin/productList" className="btn btn-ligth my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Image
              src={Api.baseUrl + "/public/" + image}
              alt={name}
              fluid
              rounded
            ></Image>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <MySpinner />}
          </Form.Group>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
