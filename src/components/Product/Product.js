import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
  // console.log(props);
  const { name, key, price, img, seller, stock } = props.product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-details">
        <p>
          <Link to={"/product/" + key}>{name}</Link>
        </p>
        <h3>Price: ${price}</h3>
        <p>
          <small> By: {seller}</small>
        </p>
        <h5>Product ID: {key}</h5>
        <p>
          <small>Only {stock} left in stock, so order soon.</small>
        </p>
        {props.showAddToCart && (
          <button
            onClick={() => props.handleAddProduct(props.product)}
            className="product-btn"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
