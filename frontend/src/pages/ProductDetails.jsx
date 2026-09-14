import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/ProductDetail.css";
import toast from "react-hot-toast";
import api from "../Axios/api";

function ProductDetails() {

  const { id } = useParams(); // id k through access krny k liye
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // Local UI state to show heart icon filled when item is added to wishlist
  const [wishAdded, setWishAdded] = useState(false);

  const getProduct = async () => {

    try {

      const response = await api.get(`https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/products/get-product/${id}`);
      setProduct(response.data.product);

    } 
    catch (error)
    {
      console.log(error);
    }
  };

  useEffect(() => {getProduct();}, [id]);

  const addToCart = async () => {
    try 
    {
      const token = localStorage.getItem("token");
      if (!token) 
        {
        alert("Please login first");
        navigate("/login");
        return;
      }
      await api.post("https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/cart/add",{ product: product._id,quantity: quantity},
        {headers: {Authorization: `Bearer ${token}`}});
      alert("Product added to cart");

    } 
    catch (error)
    {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Unable to add product";

      if (status === 401) {
        // Token invalid or expired — clear and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      alert(message);
    }
  };

  const addToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // Toggle client-side wishlist state and use a stable toast id so the
      // same product doesn't produce duplicate toasts.
      const toastId = `wishlist-${product._id}`;
      setWishAdded((prev) => {
        const next = !prev;
        if (next) {
          toast.success("Added to wishlist", { id: toastId });
        } else {
          toast.success("Removed from wishlist", { id: toastId });
        }
        return next;
      });
    } catch (error) {
      console.log("Add to wishlist error:", error);
      toast.error("Unable to add to wishlist");
    }
  };

  if (!product) 
    {
    return (
      <div className="details-loading">
        Loading product...
      </div>
    );
  }

  return (

    <div className="product-details">

      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />

        {/* Heart icon overlay on top of the image */}
        <button
          className={`wishlist-overlay ${wishAdded ? "added" : ""}`}
          aria-label={wishAdded ? "Added to wishlist" : "Add to wishlist"}
          onClick={addToWishlist}
        >
          {wishAdded ? "❤" : "♡"}
        </button>

      </div>

      <div className="details-content">

        <span className="details-label">
          STYLEHIVE COLLECTION
        </span>

        <h1>{product.name}</h1>

        <div className="details-rating">
          ⭐ {product.rating}
        </div>

        <h2>Rs. {product.price}</h2>

        <p className="details-description">
          {product.description}
        </p>

        <p className="stock">
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        {product.stock > 0 && (

          <div className="purchase">

            <div className="quantity">

              <button
                onClick={() =>
                  setQuantity(
                    quantity > 1 ? quantity - 1 : 1
                  )
                }
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(
                    quantity < product.stock
                      ? quantity + 1
                      : quantity
                  )
                }
              >
                +
              </button>

            </div>

            <button
              className="cart-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>
            {/* Heart icon for wishlist: shows outline when not added and filled when added. */}
            <button
              className="wishlist-icon-btn"
              aria-label="Add to wishlist"
              onClick={addToWishlist}
              style={{
                marginLeft: 8,
                background: wishAdded ? "#ff6b81" : "transparent",
                color: wishAdded ? "#fff" : "#ff6b81",
                border: "1px solid #ff6b81",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              {wishAdded ? "❤" : "♡"}
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ProductDetails;
