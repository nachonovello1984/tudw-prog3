import User from "./../database/user.js";

class UsersService {

    constructor() {
        this.userDB = new User();
    }

    find = async (username, password) => {
        return await this.userDB.find(username, password);
    };

    findById = async (userId) => {
        return await this.userDB.findById(userId);
    };

}

export default UsersService;