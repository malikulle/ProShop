import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProductTop } from "../actions/productActions";
import Api from "../api/api";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const { productTop } = useSelector((state) => ({
    productTop: state.productTop,
  }));
  const { products } = productTop;

  useEffect(() => {
    dispatch(getProductTop());
  }, [dispatch]);
  return (
    <div>
      <Carousel pause="hover" className="bg-dark">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={Api.baseUrl + "/public" + product.image}
                alt={product.name}
                fluid
              />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {product.name} ({product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
