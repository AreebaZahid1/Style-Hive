import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "../Style/Products.css";
import toast from "react-hot-toast";
import api from "../Axios/api"; // Import the configured Axios instance

// Local wishlist state map: { [productId]: true }
// We show a toast and visually fill the heart when a product is added to wishlist.

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [wishMap, setWishMap] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 4;

    // Admin information
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    // Form states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [rating, setRating] = useState("");

    const [editId, setEditId] = useState(null);


    // ================= GET CATEGORIES =================

    const getCategories = async () => {

        try {

            const response = await api.get(
                "http://localhost:3000/api/categories/get-categories"
            );

            setCategories(
                response.data.categories || []
            );

        } catch (error) {

            console.log(error);

        }

    };


    // ================= GET PRODUCTS =================

    const getProducts = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "http://localhost:3000/api/products/get-products",
                {
                    params: {
                        search: search,
                        category: category
                    }
                }
            );

            setProducts(
                response.data.products || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        getCategories();

    }, []);


    useEffect(() => {

        getProducts();

    }, [search, category]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);

    const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);


    // ================= ADD PRODUCT =================

    const addProduct = async (e) => {

        e.preventDefault();

        if (!name || !price || !selectedCategory || !stock) {

            alert("Please fill all required fields");

            return;

        }

        try {

            await api.post(

                "http://localhost:3000/api/products/add-product",

                {
                    name: name,
                    description: description,
                    price: Number(price),
                    category: selectedCategory,
                    image: image,
                    stock: Number(stock),
                    rating: Number(rating) || 0
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Product added successfully");

            clearForm();

            getProducts();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };


    // ================= DELETE PRODUCT =================

    const deleteProduct = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(

                `http://localhost:3000/api/products/delete-product/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Product deleted successfully");

            getProducts();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }

    };


    // ================= WISHLIST HANDLER =================

    const handleAddToWishlist = (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first");
            return;
        }

        // Toggle client-side wishlist state. If item was already present,
        // remove it and show a "Removed from wishlist" toast. Otherwise add it.
        setWishMap((prev) => {
            const already = !!prev[productId];
            const toastId = `wishlist-${productId}`;
            if (already) {
                // remove the key from the map
                const { [productId]: _, ...rest } = prev;
                // update or replace the existing toast for this product id
                toast.success("Removed from wishlist", { id: toastId });
                return rest;
            } else {
                toast.success("Added to wishlist", { id: toastId });
                return { ...prev, [productId]: true };
            }
        });
    };


    return (

        <div className="products-page">


            {/* ================= HEADER ================= */}

            <div className="products-header">

                <div>

                    <p>
                        OUR COLLECTION
                    </p>

                    <h1>
                        Products
                    </h1>

                </div>


                <div className="filters">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="">
                            All Categories
                        </option>


                        {categories.map((cat) => (

                            <option
                                key={cat._id}
                                value={cat._id}
                            >
                                {cat.name}
                            </option>

                        ))}

                    </select>

                    {role === "admin" && (
                        <Link to="/products/add" className="view-btn add-product-btn">
                            Add Product
                        </Link>
                    )}

                </div>

            </div>


            {/* ================= PRODUCTS ================= */}

            {loading ? (

                <div className="loading">
                    Loading products...
                </div>

            ) : products.length === 0 ? (

                <div className="empty-products">

                    <h2>
                        No products found
                    </h2>

                    <p>
                        Try another search or category.
                    </p>

                </div>

            ) : (

                <>

                    <div className="product-grid">

                        {paginatedProducts.map((product) => (

                            <div
                                className="product-card"
                                key={product._id}
                            >

                                <div className="product-image">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />


                                    {product.stock === 0 && (

                                        <span className="out-stock">
                                            Out of Stock
                                        </span>

                                    )}

                                    {/* Heart overlay on each product card */}
                                    <button
                                        className={`product-wishlist-overlay ${wishMap[product._id] ? "added" : ""}`}
                                        onClick={() => handleAddToWishlist(product._id)}
                                        aria-label={wishMap[product._id] ? "Added to wishlist" : "Add to wishlist"}
                                    >
                                        {wishMap[product._id] ? "❤" : "♡"}
                                    </button>
                                </div>


                                <div className="product-info">

                                    <h3>
                                        {product.name}
                                    </h3>


                                    <p className="description">
                                        {product.description}
                                    </p>


                                    <div className="product-bottom">

                                        <strong>
                                            Rs. {product.price}
                                        </strong>


                                        <span>
                                            ⭐ {product.rating}
                                        </span>

                                    </div>


                                    <Link
                                        to={`/products/${product._id}`}
                                        className="view-btn"
                                    >
                                        View Product
                                    </Link>


                                    {/* ADMIN BUTTONS */}

                                    {role === "admin" && (

                                        <div className="product-actions">

                                            <Link
                                                to={`/products/edit/${product._id}`}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </Link>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteProduct(
                                                        product._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                Prev
                            </button>

                            <span className="page-info">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                className="page-btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </button>
                        </div>
                    )}

                </>

            )}

        </div>

    );

}

export default Products;