import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const itemStyle = {
    width: "350px",
    border: "2px solid grey",
    margin: "0 10px 10px",
    padding: "10px",
  };
  return (
    <div style={itemStyle}>
      <h4> {name}</h4>
      <p>Quantity: {quantity}</p>
      <p>
        <small>$ {price}</small>
      </p>
      <button
        onClick={() => props.handleRemoveProduct(key)}
        className="product-btn"
      >
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
