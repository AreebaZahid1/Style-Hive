const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel =
    require("../models/UserModel");


// ================= REGISTER =================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            number,
            country,
            city,
            postalCode
        } = req.body;


        // Check existing user
        const existingUser =
            await UserModel.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user
        const user =
            await UserModel.create({

                name,
                email,
                password: hashedPassword,
                number,
                country,
                city,
                postalCode,

                // Normal signup = customer
                role: "customer"

            });


        res.status(201).json({

            message: "User registered successfully"

        });


    } catch (error) {

        console.log(
            "REGISTER ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

};


// ================= LOGIN =================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await UserModel.findOne({ email });


        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        const passwordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordCorrect) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }


        const token = jwt.sign(

            {
                id: user._id,
                name: user.name,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1h"
            }

        );


        res.status(200).json({

            message: "Login successful",

            token,

            role: user.role

        });


    } catch (error) {

        console.log(
            "LOGIN ERROR:",
            error
        );

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    register,
    login
};

// ================= GET PROFILE =================
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log('PROFILE ERROR:', error);
        res.status(500).json({ message: error.message });
    }
};

// ================= UPDATE PROFILE =================
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, number, country, city, postalCode, password } = req.body;

        const update = { name, number, country, city, postalCode };

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            update.password = hashed;
        }

        const user = await UserModel.findByIdAndUpdate(userId, update, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated', user });
    } catch (error) {
        console.log('UPDATE PROFILE ERROR:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};