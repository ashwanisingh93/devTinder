const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 20,
            
        },
        lastName: {
            type: String,
            trim: true, // Removes leading/trailing whitespace
        },
        emailId: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password must be stronger");
                }
            },
        },
        age: {
            type: Number,
            min: 18, // Minimum age validation
        },
        gender: {
            type: String,
            validate(value) {
                if (!["male", "female", "others"].includes(value.toLowerCase())) {
                    throw new Error("Gender is invalid");
                }
            },
        },
        photoUrl: {
            type: String,
            default: "https://www.pngitem.com/pimgs/m/22-224000_profile-pic-dummy-png-transparent-png.png",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("URL is invalid");
                }
            },
        },
        about: {
            type: String,
            default: "This is the default description of the user",
        },
        skills: {
            type: [String], // Array of strings
        },
    },
    {
        timestamps: true, 
    }
);


// Generate JWT
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "DEV@Tinder@790", {
        expiresIn: "7d",
    });
    return token;
};

// Validate Password
userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
