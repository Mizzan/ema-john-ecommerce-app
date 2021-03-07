import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = (props) => {
  const cart = props.cart;
  const totalPrice = cart.reduce(
    (acc, product) => (Number(acc) + Number(product.price)).toFixed(2),
    0
  );
  /**
   * let total = 0;
   * for(let i=0; i < cart.length; i++) {
   *    const product = cart[i];
   *    total = total + product.price;
   * }
   *
   */

  let shippingCost = 0;
  if (totalPrice > 35) {
    shippingCost = 0;
  } else if (totalPrice > 15) {
    shippingCost = 4.99;
  } else if (totalPrice > 0) {
    shippingCost = 12.99;
  }

  const tax = (totalPrice / 15).toFixed(2);
  const totalPriceAfterTax = (Number(totalPrice) + Number(tax)).toFixed(2);
  const orderTotal = (
    Number(totalPriceAfterTax) + Number(shippingCost)
  ).toFixed(2);
  return (
    <div className="cart">
      <div className="card-header">
        <h3>Order Summary</h3>
        <p>Items ordered: {cart.length}</p>
      </div>
      <div className="cart-details">
        <p>Shopping & Handling: {shippingCost}</p>
        <h5>Total Price : {totalPrice}</h5>
        <p>Estimated Tax: {tax}</p>
        <p>Total Price After Tax: {totalPriceAfterTax}</p>
        <h5>Order Total : {orderTotal}</h5>

        <Link to="/review">
          <button className="product-btn">Review Order</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
