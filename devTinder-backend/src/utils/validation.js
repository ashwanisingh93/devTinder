
const validator = require('validator');
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || typeof firstName !== 'string' || firstName.trim() === "") {
        throw new Error("First name is required.");
    }
    if (!lastName || typeof lastName !== 'string' || lastName.trim() === "") {
        throw new Error("Last name is required.");
    }
    if (!emailId || !validator.isEmail(emailId)) {
        throw new Error("Email is not valid.");
    }
    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough. It must include at least 8 characters, with one uppercase, one lowercase, one number, and one symbol.");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "skills", "gender", "age", "photoUrl", "about"];

    const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
