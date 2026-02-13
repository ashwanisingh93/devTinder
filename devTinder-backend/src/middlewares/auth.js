const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read the token from request cookies
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Please Log In");
        }

        // Verify the token
        const decodedObj = jwt.verify(token, "DEV@Tinder@790");
        const { _id } = decodedObj;

        // Find the user by ID
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Attach the user to the request object
        req.user = user;

        // Call the next middleware
        next();
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
};

module.exports = { userAuth };
