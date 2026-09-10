require("dotenv").config();

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(
    "Cloudinary cloud name:",
    process.env.CLOUDINARY_CLOUD_NAME
);

console.log(
    "Cloudinary API key exists:",
    !!process.env.CLOUDINARY_API_KEY
);

console.log(
    "Cloudinary secret exists:",
    !!process.env.CLOUDINARY_API_SECRET
);


const uploadToCloudinary = (buffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream =
            cloudinary.uploader.upload_stream(
                {
                    folder: "stylehive"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

        uploadStream.end(buffer);
    });
};


module.exports = {
    uploadToCloudinary
};