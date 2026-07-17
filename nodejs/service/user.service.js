const postModel = require("../model/post.model");
const userModel = require("../model/user.model");
const nodemailer = require("nodemailer");
const validator = require("validator");
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
class userservice {
    addUser = async (req) => {
        const {
            username,
            password,
            phone,
            email,
            gender,
            roles
        } = req.body;

        if (!username || !password || !phone || !email || !gender || roles.length === 0) {
            throw new Error("All fields are required");
        }
        if (!validator.isEmail(email)) {
            throw new Error("Invalid email address");
        }
        if (!validator.isMobilePhone(phone, "en-IN")) {
            throw new Error("Invalid phone number");
        }
        if (!validator.isStrongPassword(password, {
            minLength: 6,
            minUppercase: 1,
            minLowercase: 1,
            minNumbers: 0,
            minSymbols: 0,
        })) {
            throw new Error(
                "Password must contain at least 6 characters, one uppercase letter, one lowercase letter and one number."
            );
        }
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            throw new Error("Username or Email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const user = await userModel.create({
            username,
            password: hashedPassword,
            phone,
            email,
            gender,
            roles,
            verificationToken,
            isVerified: false,
        });
        const verifyLink = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify your Email",
            html: `
            <h2>Hello ${username}</h2>
            <p>Click below to verify your account.</p>
            <a href="${verifyLink}">
                Verify Email
            </a>
        `,
        });

        return {
            message: "Verification email sent",
        };
    };
    getUsers = async () => {
        return await userModel.find();
    };
    updateUser = async (req) => {
        const id = req.params.id;
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        if (!req.file && !user.profilePhoto) {
            throw new Error("Please upload a profile photo");
        }
        if (req.body.username) {
            const existingUsername = await userModel.findOne({
                username: req.body.username,
                _id: { $ne: id }
            });

            if (existingUsername) {
                throw new Error("Username already exists");
            }
        }
        if (req.body.email) {
            const existingEmail = await userModel.findOne({
                email: req.body.email,
                _id: { $ne: id }
            });
            if (existingEmail) {
                throw new Error("Email already exists");
            }
        }
        const updateData = {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            roles: req.body.roles,
        };
        if (req.file) {
            if (user.profilePhoto) {
                const imagePath = path.join(__dirname, "..", user.profilePhoto);

                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            updateData.profilePhoto = req.file.path;
        }
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {
                $set: updateData,
            },
            {
                new: true,
            }
        );
        return updatedUser;
    };
    getUserById = async (req) => {
        const id = req.params.id;
        return await userModel.findById(id);
    }
    login = async (req) => {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            throw new Error("Invalid Username");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid Password");
        }
        if (!user.isVerified) {
            throw new Error("Please verify your email before logging in.");
        }
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h",
            }
        );
        return {
            token,
            user,
        };
    };
    verifyEmail = async (req) => {
        const token = req.params.token;
        const user = await userModel.findOne({
            verificationToken: token,
        });

        if (!user) {
            throw new Error("Invalid verification link");
        }
        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return {
            message: "Email verified successfully",
        };
    };
}
module.exports = new userservice()