import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import "../Style/Cart.css";
import api from "../Axios/api"; // Import the configured Axios instance

function Cart() {

    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    // ================= GET CART =================

    const getCart = async () => {

        try {

            const response = await api.get(
                "https://style-hive-nl9ivtptx-areeba-aee0.vercel.app/api/cart/get-cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(response.data.cart);

        } catch (error) {

            const status = error.response?.status;
            if (status === 401) {
                // session expired
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                alert("Session expired. Please login again.");
                navigate("/login");
                return;
            }

            console.log(error);

        }

    };


    useEffect(() => {

        if (token) {
            getCart();
        }

    }, []);


    // ================= REMOVE ITEM =================

    const removeItem = async (productId) => {

        try {

            await api.delete(
                "https://style-hive-nl9ivtptx-areeba-aee0.vercel.app/api/cart/remove",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    data: {
                        product: productId
                    }
                }
            );


            getCart();


        } catch (error) {

            const status = error.response?.status;
            if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                alert("Session expired. Please login again.");
                navigate("/login");
                return;
            }

            console.log(error);

        }

    };


    // ================= NOT LOGGED IN =================

    if (!token) {

        return (

            <div className="cart-login-required">

                <div className="login-cart-icon">

                    <ShoppingBag size={55} />

                </div>


                <p className="cart-label">
                    SHOPPING BAG
                </p>


                <h1>
                    Your cart is waiting
                </h1>


                <p className="cart-login-text">

                    Login or create an account to add products
                    and continue shopping.

                </p>


                <div className="cart-login-buttons">

                    <Link
                        to="/login"
                        className="cart-login-btn"
                    >
                        Login
                    </Link>


                    <Link
                        to="/signup"
                        className="cart-signup-btn"
                    >
                        Create Account
                    </Link>

                </div>


                <Link
                    to="/products"
                    className="continue-shopping"
                >
                    Continue Shopping
                    <ArrowRight size={17} />
                </Link>

            </div>

        );

    }


    // ================= LOADING =================

    if (!cart) {

        return (

            <div className="cart-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading your cart...
                </p>

            </div>

        );

    }


    // ================= TOTAL =================

    const total = cart.items.reduce(

        (sum, item) =>
            sum +
            item.product.price *
            item.quantity,

        0

    );


    return (

        <div className="cart-page">


            {/* Header */}

            <div className="cart-heading">

                <p>
                    YOUR SHOPPING BAG
                </p>


                <h1>
                    Shopping Cart
                </h1>


                <span>

                    {cart.items.length}{" "}

                    {
                        cart.items.length === 1
                            ? "item"
                            : "items"
                    }

                </span>

            </div>


            {/* Empty cart */}

            {cart.items.length === 0 ? (

                <div className="empty-cart">

                    <div className="empty-cart-icon">

                        <ShoppingBag size={55} />

                    </div>


                    <h2>
                        Your cart is empty
                    </h2>


                    <p>
                        Looks like you haven't added anything yet.
                    </p>


                    <Link
                        to="/products"
                        className="continue-btn"
                    >
                        Start Shopping
                        <ArrowRight size={17} />
                    </Link>

                </div>

            ) : (

                <div className="cart-layout">


                    {/* Cart Items */}

                    <div className="cart-items">

                        {cart.items.map((item) => (

                            <div
                                className="cart-item"
                                key={item.product._id}
                            >


                                <div className="cart-product-image">

                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />

                                </div>


                                <div className="cart-item-info">

                                    <p className="item-category">
                                        STYLEHIVE
                                    </p>


                                    <h3>
                                        {item.product.name}
                                    </h3>


                                    <p className="item-price">

                                        Rs.{" "}

                                        {item.product.price.toLocaleString()}

                                    </p>


                                    <span className="item-quantity">

                                        Quantity: {item.quantity}

                                    </span>

                                </div>


                                <div className="cart-item-total">

                                    <strong>

                                        Rs.{" "}

                                        {(
                                            item.product.price *
                                            item.quantity
                                        ).toLocaleString()}

                                    </strong>


                                    <button
                                        className="remove-btn"

                                        onClick={() =>
                                            removeItem(
                                                item.product._id
                                            )
                                        }
                                    >

                                        <Trash2 size={17} />

                                        Remove

                                    </button>

                                </div>


                            </div>

                        ))}

                    </div>


                    {/* Summary */}

                    <div className="cart-summary">

                        <p className="summary-label">
                            ORDER SUMMARY
                        </p>


                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Subtotal
                            </span>


                            <strong>

                                Rs.{" "}
                                {total.toLocaleString()}

                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery
                            </span>


                            <strong className="free">
                                Free
                            </strong>

                        </div>


                        <div className="summary-line"></div>


                        <div className="grand-total">

                            <span>
                                Total
                            </span>


                            <strong>

                                Rs.{" "}
                                {total.toLocaleString()}

                            </strong>

                        </div>


                      <button className="checkout-btn"
                      onClick={() => navigate("/checkout", {state: { cart: cart }})}>

                          Proceed to Checkout
                      <ArrowRight size={19} />
                      </button>


                        <Link
                            to="/products"
                            className="back-shopping"
                        >

                            ← Continue Shopping

                        </Link>

                    </div>


                </div>

            )}

        </div>

    );

}


export default Cart;