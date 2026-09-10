// seed automatically first time user(admin) create kr deta hai
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserModel = require("./models/UserModel");

require("dotenv").config();


const createAdmin = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");


        const password = await bcrypt.hash("Admin123", 10);


        const admin = await UserModel.create({

            name: "Admin",

            email: "admin@gmail.com",

            password: password,

            number: "03001234567",

            country: "Pakistan",

            city: "Islamabad",

            postalCode: "44000",

            profilePicture: "default.jpg",

            role: "admin"

        });


        console.log("Admin created");

        console.log("Email: admin@gmail.com");

        console.log("Password: Admin123");


        process.exit();

    } catch (error) {

        console.log(error.message);

        process.exit(1);

    }

};


createAdmin();