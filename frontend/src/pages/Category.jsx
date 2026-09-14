import React, { useEffect, useState } from "react";
// import axios from "axios";
import "../Style/Category.css";
import api from "../Axios/api";

function Category() {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");


    // ================= GET CATEGORIES =================

    const getCategories = async () => {

        try {

            const response = await api.get(
                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/categories/get-categories"
            );

            setCategories(
                response.data.categories || []
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        getCategories();

    }, []);


    // ================= ADD CATEGORY =================

    const addCategory = async (e) => {

        e.preventDefault();


        if (!name.trim()) {

            alert("Please enter category name");

            return;

        }


        try {

            await api.post(

                "https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/categories/add-category",

                {
                    name: name
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            alert("Category added successfully");

            setName("");

            getCategories();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to add category"
            );

        }

    };


    // ================= EDIT CATEGORY =================

    const editCategory = (category) => {

        setEditId(category._id);

        setName(category.name);

    };


    // ================= UPDATE CATEGORY =================

    const updateCategory = async (e) => {

        e.preventDefault();


        if (!name.trim()) {

            alert("Please enter category name");

            return;

        }


        try {

            await api.put(

                `https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/categories/update-category/${editId}`,

                {
                    name: name
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            alert("Category updated successfully");

            setName("");

            setEditId(null);

            getCategories();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to update category"
            );

        }

    };


    // ================= DELETE CATEGORY =================

    const deleteCategory = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            await api.delete(

                `https://vercel.com/areeba-aee0/style-hive/6sAJgFBrp5p1HvR2Yff3ZoPq7yof/api/categories/delete-category/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            alert("Category deleted successfully");

            getCategories();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete category"
            );

        }

    };


    // ================= CANCEL EDIT =================

    const cancelEdit = () => {

        setEditId(null);

        setName("");

    };


    return (

        <div className="category-page">


            {/* ================= HEADER ================= */}

            <div className="category-header">

                <div>

                    <p className="category-label">
                        PRODUCT MANAGEMENT
                    </p>

                    <h1>
                        Categories
                    </h1>

                    <p className="category-subtitle">
                        Manage your product categories
                    </p>

                </div>


                <div className="category-count">

                    <span>
                        {categories.length}
                    </span>

                    <small>
                        Total Categories
                    </small>

                </div>

            </div>


            <div className="category-content">


                {/* ================= ADMIN FORM ================= */}

                {role === "admin" && (

                    <div className="category-form-card">

                        <h2>

                            {editId
                                ? "Update Category"
                                : "Add New Category"}

                        </h2>


                        <p>

                            {editId
                                ? "Update the selected category."
                                : "Create a new product category."}

                        </p>


                        <form
                            onSubmit={
                                editId
                                    ? updateCategory
                                    : addCategory
                            }
                        >

                            <label>
                                Category Name
                            </label>


                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />


                            <div className="category-form-buttons">

                                <button
                                    type="submit"
                                    className="primary-btn"
                                >

                                    {editId
                                        ? "Update Category"
                                        : "Add Category"}

                                </button>


                                {editId && (

                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={cancelEdit}
                                    >
                                        Cancel
                                    </button>

                                )}

                            </div>

                        </form>

                    </div>

                )}


                {/* ================= CATEGORY LIST ================= */}

                <div className="category-list-card">

                    <div className="list-header">

                        <div>

                            <h2>
                                All Categories
                            </h2>

                            <p>
                                {categories.length} categories available
                            </p>

                        </div>

                    </div>


                    {categories.length === 0 ? (

                        <div className="empty-category">

                            <div className="empty-icon">
                                📂
                            </div>

                            <h3>
                                No Categories Yet
                            </h3>

                            <p>
                                No categories are available.
                            </p>

                        </div>

                    ) : (

                        <div className="category-list">

                            {categories.map(
                                (category, index) => (

                                    <div
                                        className="category-item"
                                        key={category._id}
                                    >


                                        {/* Number */}

                                        <div className="category-number">

                                            {String(
                                                index + 1
                                            ).padStart(2, "0")}

                                        </div>


                                        {/* Name */}

                                        <div className="category-name">

                                            <h3>
                                                {category.name}
                                            </h3>

                                            <span>
                                                Category
                                            </span>

                                        </div>


                                        {/* Admin buttons */}

                                        {role === "admin" && (

                                            <div className="category-actions">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        editCategory(
                                                            category
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteCategory(
                                                            category._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}

export default Category;