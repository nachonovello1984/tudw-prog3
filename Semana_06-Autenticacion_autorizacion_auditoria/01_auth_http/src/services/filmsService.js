import Film from "../database/film.js";

class FilmsService {

    constructor() {
        this.filmDB = new Film();
    }

    findAll = async () => {
        return await this.filmDB.findAll();
    }
}

export default FilmsService;