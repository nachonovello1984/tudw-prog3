export default class ActorDTO {

    constructor(actorId, firstName, lastName, lastUpdate) {
        this.actorId = actorId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.lastUpdate = lastUpdate;
    }

    static toDBFields (objParam) {
        let res = [];
        const claves = Object.keys(objParam);
        for (const k of claves) {
            const objNuevo = {}
            objNuevo[getFieldName(k)] = objParam[k];
            res.push(objNuevo);
        }
    
        return res;
    };
    
    static getFieldName (objAttr) {
        switch (objAttr) {
            case "actorId":
                return "actor_id";
            case "firstName":
                return "first_name";
            case "lastName":
                return "last_name";
        }
    };

}

