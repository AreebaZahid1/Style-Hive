import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/Checkout.css";
import api from "../Axios/api";

function Checkout() {
    // =========================
    // STATES
    // =========================

    const [cart, setCart] = useState(null);

    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false);

    const [userDetails, setUserDetails] = useState(null);

    const [name, setName] = useState("");
    const [emailState, setEmailState] = useState("");
    const [numberState, setNumberState] = useState("");
    const [countryState, setCountryState] = useState("");
    const [cityState, setCityState] = useState("");
    const [postalCodeState, setPostalCodeState] = useState("");

    const navigate = useNavigate();

    // Get token from localStorage
    const token = localStorage.getItem("token");

    // =========================
    // GET USER DETAILS
    // =========================

    const getUserDetails = async () => {
        try {
            const response = await api.get(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const user = response.data.user;

            setUserDetails(user);

            setName(user.name || "");
            setEmailState(user.email || "");
            setNumberState(user.number || "");
            setCountryState(user.country || "");
            setCityState(user.city || "");
            setPostalCodeState(user.postalCode || "");

        } catch (error) {
            console.log("Get user details error:", error);   }};
    // =========================
    // GET CART
    // =========================

    const getCart = async () => {
        try {
            const response = await api.get(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/cart/get-cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Cart response:", response.data);

            // If API returns { cart: {...} }
            if (response.data.cart) {
                setCart(response.data.cart);
            } else {
                // If API directly returns cart
                setCart(response.data);
            }
        } catch (error) {
            console.log("Get cart error:", error);

            const status = error.response?.status;

            if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                alert("Session expired. Please login again.");

                navigate("/login");

                return;
            }

            alert(
                error.response?.data?.message ||
                    "Unable to load cart"
            );
        }
    };

    // =========================
    // SAVE PROFILE
    // =========================

    const saveProfile = async () => {
        try {
            const payload = {
                name: name,
                number: numberState,
                country: countryState,
                city: cityState,
                postalCode: postalCodeState,
            };

            const response = await api.put(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/auth/me",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserDetails(response.data.user);

            alert(
                response.data.message ||
                    "Profile saved successfully"
            );
        } catch (error) {
            console.log("Save profile error:", error);

            const status = error.response?.status;

            if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                alert("Session expired. Please login again.");

                navigate("/login");

                return;
            }

            alert(
                error.response?.data?.message ||
                    "Unable to save profile"
            );
        }
    };

    // =========================
    // PLACE ORDER
    // =========================

    const placeOrder = async () => {
        // Check address
        if (!address.trim()) {
            alert("Please enter your delivery address");
            return;
        }

        // Check cart
        if (!cart || !cart.items || cart.items.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            setLoading(true);

            // Build items array to match OrderModel schema: [{ product, quantity, price }, ...]
            const orderItems = cart.items.map((it) => ({
                // `it.product` can be either an object (with _id) or just an id depending on API
                product: it.product?._id || it.product,
                quantity: it.quantity,
                // include price here so backend can save a snapshot of item price
                price: Number(it.product?.price || 0),
            }));

            // Compose the payload expected by the backend createOrder controller
            const orderData = {
                items: orderItems,
                totalAmount: totalAmount,
                address: address,
            };

            console.log("Order data:", orderData);

            // Send to the backend route mounted at /api/order/create
            const response = await api.post(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/order/create",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Order response:", response.data);

            alert(
                response.data.message ||
                    "Order placed successfully"
            );

            // Redirect to home page after successful order
            navigate("/");
        } catch (error) {
            console.log("Place order error:", error);

            const status = error.response?.status;

            if (status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("role");

                alert("Session expired. Please login again.");

                navigate("/login");

                return;
            }

            alert(
                error.response?.data?.message ||
                    "Unable to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // CALCULATE TOTAL
    // =========================

    const getTotalAmount = () => {
        if (!cart || !cart.items) {
            return 0;
        }

        return cart.items.reduce((total, item) => {
            const price = Number(item.product?.price || 0);
            const quantity = Number(item.quantity || 0);

            return total + price * quantity;
        }, 0);
    };

    const totalAmount = getTotalAmount();

    // =========================
    // LOAD DATA
    // =========================

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        getUserDetails();
        getCart();
    }, []);

    // =========================
    // LOGIN CHECK
    // =========================

    if (!token) {
        return null;
    }

    // =========================
    // CHECK CART
    // =========================

    if (!cart) {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <h2>Loading checkout...</h2>
                </div>
            </div>
        );
    }

    // =========================
    // MAIN CHECKOUT UI
    // =========================

    return (
        <div className="checkout-page">

            <div className="checkout-container">

                {/* =========================
                    LEFT SIDE
                ========================== */}

                <div className="checkout-form">

                    <p className="checkout-label">
                        CHECKOUT
                    </p>

                    <h1>Delivery Details</h1>         

                    {/* FULL NAME */}

                    <div className="input-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="input-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={emailState}
                            disabled
                        />

                    </div>

                    {/* PHONE */}

                    <div className="input-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="text"
                            value={numberState}
                            onChange={(e) =>
                                setNumberState(e.target.value)
                            }
                            placeholder="Enter phone number"
                        />

                    </div>

                    {/* COUNTRY */}

                    <div className="input-group">

                        <label>
                            Country
                        </label>

                        <input
                            type="text"
                            value={countryState}
                            onChange={(e) =>
                                setCountryState(e.target.value)
                            }
                            placeholder="Enter country"
                        />

                    </div>

                    {/* CITY */}

                    <div className="input-group">

                        <label>
                            City
                        </label>

                        <input
                            type="text"
                            value={cityState}
                            onChange={(e) =>
                                setCityState(e.target.value)
                            }
                            placeholder="Enter city"
                        />

                    </div>

                    {/* POSTAL CODE */}

                    <div className="input-group">

                        <label>
                            Postal Code
                        </label>

                        <input
                            type="text"
                            value={postalCodeState}
                            onChange={(e) =>
                                setPostalCodeState(e.target.value)
                            }
                            placeholder="Enter postal code"
                        />

                    </div>

                    {/* DELIVERY ADDRESS */}

                    <div className="input-group">

                        <label>
                            Delivery Address
                        </label>

                        <textarea
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            placeholder="Enter your complete delivery address"
                        />

                    </div>

                    {/* BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "20px",
                        }}
                    >

                        {/* PLACE ORDER */}

                        <button
                            type="button"
                            className="place-order-btn"
                            onClick={placeOrder}
                            disabled={loading}
                        >
                            {loading
                                ? "Placing Order..."
                                : "Place Order"}
                        </button>

                    </div>

                </div>

                {/* =========================
                    RIGHT SIDE
                ========================== */}

                <div className="checkout-summary">

                    <p className="checkout-label">
                        ORDER SUMMARY
                    </p>

                    <h2>
                        Your Order
                    </h2>

                    {/* EMPTY CART */}

                    {cart.items &&
                        cart.items.length === 0 && (
                            <div>
                                <p>
                                    Your cart is empty.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/cart")
                                    }
                                >
                                    Go to Cart
                                </button>
                            </div>
                        )}

                    {/* CART ITEMS */}

                    {cart.items &&
                        cart.items.map((item) => {

                            // Prevent errors if product is missing
                            if (!item.product) {
                                return null;
                            }

                            const itemPrice =
                                Number(
                                    item.product.price || 0
                                );

                            const quantity =
                                Number(
                                    item.quantity || 0
                                );

                            const itemTotal =
                                itemPrice * quantity;

                            return (
                                <div
                                    className="checkout-item"
                                    key={item.product._id}
                                >

                                    {/* PRODUCT IMAGE */}

                                    <img
                                        src={
                                            item.product.image
                                        }
                                        alt={
                                            item.product.name
                                        }
                                    />

                                    {/* PRODUCT INFORMATION */}

                                    <div>

                                        <h3>
                                            {
                                                item.product
                                                    .name
                                            }
                                        </h3>

                                        <p>
                                            Quantity:{" "}
                                            {quantity}
                                        </p>

                                        <strong>
                                            Rs.{" "}
                                            {itemTotal.toLocaleString()}
                                        </strong>

                                    </div>

                                </div>
                            );
                        })}

                    {/* TOTAL */}

                    {cart.items &&
                        cart.items.length > 0 && (
                            <div className="checkout-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    Rs.{" "}
                                    {totalAmount.toLocaleString()}
                                </strong>

                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}

export default Checkout;