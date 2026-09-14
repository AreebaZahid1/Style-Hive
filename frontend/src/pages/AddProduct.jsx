import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Style/Products.css";
import api from "../Axios/api"; // Import the configured Axios instance

function AddProduct() {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (role !== "admin") {
            navigate("/products");
            return;
        }

        const getCategories = async () => {
            try {
                const response = await api.get(
                    "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/categories/get-categories"
                );
                setCategories(response.data.categories || []);
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, [role, navigate]);

    const addProduct = async (e) => {
        e.preventDefault();

        if (!name || !price || !selectedCategory || !stock) {
            alert("Please fill all required fields");
            return;
        }

        try {
            await api.post(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/products/add-product",
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

            alert("Product added successfully");
            navigate("/products");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Failed to add product");
        }
    };

    return (
        <div className="products-page">
            <div className="product-form-card add-product-page-card">
                <h2>Add Product</h2>

                <form onSubmit={addProduct}>
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
                        <button type="submit">Add Product</button>
                        <button type="button" className="secondary-btn" onClick={() => navigate("/products")}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
