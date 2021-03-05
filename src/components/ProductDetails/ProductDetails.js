import React from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import "./ProductDetails.css";
const ProductDetails = () => {
  const { productKey } = useParams();
  const product = fakeData.find((product) => product.key === productKey);
  //   const productDetails = {
  //     margin: "0 auto",
  //     padding: "10px",
  //     fontSize: "12px",
  //     width: "340px",
  //     border: "2px solid #333",
  //   };

  return (
    <div>
      {/* using product card component */}
      <Product showAddToCart={false} product={product}></Product>

      {/* creating new product card */}
      {/* <img src={getProduct.img} alt="" />
      <h3>Product Name: {getProduct.name}</h3>
      <h4>Price : ${getProduct.price}</h4>
      <h4>By : {getProduct.seller}</h4>
      <h4>Category : {getProduct.category}</h4> */}
    </div>
  );
};

export default ProductDetails;
