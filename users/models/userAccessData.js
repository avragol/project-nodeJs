const usersServiceMongo = require("../../models/mongoDB/users/usersService");
const dbOption = "mongo";

const registerUser = (userData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.registerUser(userData);
    }
};

const getUserByEmail = (email) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getUserByEmail(email);
    }
};
const getUserById = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getUserById(id);
    }
};

const getAllUsers = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.getAllUsers();
    }
};

const updateUser = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.updateUser();
    }
};

const updateBizUser = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.updateBizUser();
    }
};

const deleteUser = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return usersServiceMongo.deleteUser();
    }
};

module.exports = {
    registerUser,
    getUserByEmail,
    getUserById,
    getAllUsers,
    updateUser,
    updateBizUser,
    deleteUser
};
