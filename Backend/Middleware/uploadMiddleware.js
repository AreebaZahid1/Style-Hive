const multer = require("multer"); // use to upload pics

const storage = multer.memoryStorage(); // 2 types of multer storage: disk and memory

const upload = multer
({
  storage, // memory storage
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => 
    {
    if (file.mimetype.startsWith("image/")) // file image ki hogi
    {
      cb(null, true); // call-back function 
                     //   1st parameter is error lekin hum null rakhty hain
    } 
    else // agr image upload ni hui
    {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

module.exports = upload;