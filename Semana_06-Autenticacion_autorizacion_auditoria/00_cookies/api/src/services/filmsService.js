import Film from "../database/film";

class FilmsService {

    constructor() {
        this.filmDB = new Film();
    }

    findAll = () => {
        return this.filmDB.findAll();
    };

}

export default FilmsService;