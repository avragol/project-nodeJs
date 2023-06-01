const User = require('./User');

const registerUser = userData => {
    const user = new User(userData);
    return user.save();
};

const getUserByEmail = (email) => {
    return User.findOne({ email });
};

const getAllUsers = () => {
    return User.find();
}

const getUserById = id => {
    return User.findById(id);
}

const updateUser = (id, userToUpdate) => {
    return User.findByIdAndUpdate(id, userToUpdate, { new: true });
}

const updateBizUser = (id) => {
    return User.findByIdAndUpdate(id, [{ "$set": { "isBiz": { "$eq": [false, "$isBiz"] } } }], { new: true });
};

const deleteUser = (id) => {
    return User.findByIdAndDelete(id);
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