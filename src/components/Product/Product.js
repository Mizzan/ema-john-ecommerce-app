import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  // console.log(props);
  const { name, key, price, img, seller, stock } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <p>{name}</p>
        <h3>Price: ${price}</h3>
        <p>
          <small> By: {seller}</small>
        </p>
        <h5>Product ID: {key}</h5>
        <p>
          <small>Only {stock} left in stock, so order soon.</small>
        </p>
        <button
          onClick={() => props.handleAddProduct(props.product)}
          className="product-btn"
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
