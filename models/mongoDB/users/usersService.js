const User = require('./User');

const registerUser = userData => {
    const user = new User(userData);
    return user.save();
};

const getUserByEmail = (email) => {
    return User.findOne({ email });
};

const getAllUsers = () => {
    return User.find().select(["-password"]);
}

const getUserById = id => {
    return User.findById(id).select(["-password"]);
}

const updateUser = (id, userToUpdate) => {
    return User.findByIdAndUpdate(id, userToUpdate, { new: true }).select(["-password"]);
}

const updateBizUser = (id) => {
    return User.findByIdAndUpdate(id, [{ "$set": { "isBiz": { "$not": "$isBiz" } } }], { new: true }).select(["-password"]);
};

const deleteUser = (id) => {
    return User.findByIdAndDelete(id).select(["-password", "-createdAt", "-__v"]);
}

module.exports = {
    registerUser,
    getUserById,
    getAllUsers,
    getUserByEmail,
    updateUser,
    updateBizUser,
    deleteUser,
}