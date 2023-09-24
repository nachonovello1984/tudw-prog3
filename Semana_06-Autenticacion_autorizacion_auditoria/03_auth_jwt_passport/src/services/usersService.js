const User = require("./../database/user");

const find = async (username, password) => {
    return await User.find(username, password);
};

const findById = async (userId) => {
    return await User.findById(userId);
};

module.exports = {find, findById};