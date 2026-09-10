const productModel = require('../models/productModel');


const addProduct = async(req,res) => {
    try
    {
      const{name,description,price,category,image,stock,rating} = req.body;
      const product = await productModel.create({ name,description,price,category,image,stock,rating});
     
      res.status(201).json({message: 'Product added successfully', product});
    }
    catch(error)
    {
        console.log("Error");
        res.status(500).json({message: error.message});
    }
}

//get all products
const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let filter = {};

        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            filter.category = category;
        }

        const products = await productModel.find(filter).populate('category');
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// get single product by id
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('category');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

//update product
const updateProduct = async (req, res) => {
    try 
    {
        const product = await productModel.findByIdAndUpdate(req.params.id,req.body,{new: true});

        if (!product) 
        {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully",product});

    } 
    catch (error) 
    {
        res.status(500).json({message: "Error updating product", error: error.message });
    }
};
//delete product
const deleteProducts = async(req,res) => {
    try
    {
       const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) 
        {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    } 
    catch (error) 
    {
        res.status(500).json({message: "Error deleting product",error: error.message});
    }
};



module.exports = {addProduct,getProducts,getProduct,updateProduct,deleteProducts};