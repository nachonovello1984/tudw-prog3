const User = require("./../database/user");
const UserAccess = require("./../database/userAccess");
const utils = require('../utils/utils');

const find = async (username, password) => {
    return await User.find(username, password);
};

const login = async (username, password, ip) => {
    const user = await find(username, password);

    if (!user) {
        return user;
    }
    
    const user_access = {
        userId: user.userId,
        fechaHora: new Date().toISOString().replace('T', ' ').replace('Z', ''),
        host: utils.toIPv4(ip)
    };
    

    await UserAccess.create(user_access);

    return user;
};

const findById = async (userId) => {
    return await User.findById(userId);
};

module.exports = {login, find, findById};