const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;
    // No token
    if (!authHeader) 
    {
        return res.status(401).json({ message: "Please login first"});
    }

    // Get token
    const token =authHeader.split(" ")[1];
    if (!token) 
    {
        return res.status(401).json({message: "Please login first"});
    }

    try 
    {
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        // Save logged-in user
        req.user = decoded;
        next();
    } 
    catch (error) 
    {
        return res.status(401).json({message: "Invalid or expired token"});
    }
};


module.exports = authMiddleware;