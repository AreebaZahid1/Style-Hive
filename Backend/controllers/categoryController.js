const CategoryModel = require('../models/CategoryModel');

const addCategory = async(req, res) => {
    try 
    {
        const {name} = req.body;
        const category = await CategoryModel.create({name});
        res.status(201).json({message: 'Category added successfully', category});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

const getCategories = async(req, res) => {
    try 
    {
        const categories = await CategoryModel.find();
        res.status(200).json({categories});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

const updateCategory = async(req, res) => {
    try 
    {
        const {id} = req.params;
        const {name} = req.body;
        const category = await CategoryModel.findByIdAndUpdate(id, {name}, {new: true});
        res.status(200).json({message: 'Category updated successfully', category});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

const deleteCategory = async(req, res) => {
    try 
    {
        const {id} = req.params;
        const category = await CategoryModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Category deleted successfully', category});
    }
    catch(error)
    {
        console.log(error); 
        res.status(500).json({message: error.message});
    }
}

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };