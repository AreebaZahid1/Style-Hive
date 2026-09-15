import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../Style/Products.css";
import api from "../Axios/api";

function EditProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState("");
    const [rating, setRating] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (role !== "admin") {
            navigate("/products");
            return;
        }

        const getCategories = async () => {
            try {
                const response = await api.get(
                    "/categories/get-categories"
                );
                setCategories(response.data.categories || []);
            } catch (error) {
                console.log(error);
            }
        };

        const getProduct = async () => {
            try {
                const response = await api.get(
                    `/products/get-product/${id}`
                );
                const product = response.data.product || {};

                setName(product.name || "");
                setDescription(product.description || "");
                setPrice(product.price || "");
                setSelectedCategory(product.category?._id || product.category || "");
                setImage(product.image || "");
                setStock(product.stock || "");
                setRating(product.rating || "");
            } catch (error) {
                console.log(error);
                alert(error.response?.data?.message || "Failed to load product");
                navigate("/products");
            } finally {
                setLoading(false);
            }
        };

        getCategories();
        getProduct();
    }, [id, role, navigate]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!name || !price || !selectedCategory || !stock) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await api.put(
                `/products/update-product/${id}`,
                {
                    name: name,
                    description: description,
                    price: Number(price),
                    category: selectedCategory,
                    image: image,
                    stock: Number(stock),
                    rating: Number(rating) || 0,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product updated successfully");
            navigate("/products");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to update product");
        }
    };

    if (loading) {
        return (
            <div className="products-page">
                <div className="loading">Loading product...</div>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="product-form-card add-product-page-card">
                <h2>Update Product</h2>

                <form onSubmit={updateProduct}>
                    <input
                        type="text"
                        placeholder="Product name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />

                    <div className="add-product-actions">
                        <button type="submit">Update Product</button>
                        <button type="button" className="secondary-btn" onClick={() => navigate("/products")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
