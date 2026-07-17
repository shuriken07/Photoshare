
const userservice = require("../service/user.service")
const arr = []

class controller {
    addUser = async (req, res) => {
        try {
            const data = await userservice.addUser(req);

            return res.status(200).json({
                message: "User Added Successfully",
                status: true,
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }

    getUsers = async (req, res) => {
        try {
            const data = await userservice.getUsers();

            return res.status(200).json({
                message: "Users fetched successfully",
                status: true,
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }
    updateUser = async (req, res) => {
        try {
            const data = await userservice.updateUser(req);

            return res.status(200).json({
                status: true,
                message: "Username Updated Successfully",
                data
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "username should be unique"
            });
        }
    }
    getUserById = async (req, res) => {
        try {
            const data = await userservice.getUserById(req);
            return res.status(200).json({
                status: true,
                data
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    login = async (req, res) => {
        try {
            const data = await userservice.login(req);
            return res.status(200).json({
                status: true,
                message: "Login Successful",
                token: data.token,
                user: data.user
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    verifyEmail = async (req, res) => {
        try {
            const data = await userservice.verifyEmail(req);
            return res.status(200).json({
                status: true,
                message: data.message,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
            });
        }
    }
}

module.exports = new controller()