import User from "./../database/user.js";

class UsersService {

    constructor() {
        this.userDB = new User();
    }

    find = async (username, password) => {
        return await User.find(username, password);
    };

    findById = async (userId) => {
        return await User.findById(userId);
    };

}

export default UsersService;