import Actor from "../database/actor.js";

class ActorsService {
  constructor() {
    this.actorDB = new Actor();
  }

  findAll = (filter, limit, offset, order, asc) => {

    //Obtengo los filtros para cada campo ya con el nombre que llevan en la BD.
    const sqlFilter = this.dbFieldsObj(filter);

    //Idem anterior pero para el campo por el que voy a hacer las ordenaciones.
    const sqlOrder = this.dbFieldsName(order);

    const strAsc = (asc) ? "ASC " : "DESC ";
    return this.actorDB.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
  };

  findById = (id) => {
    return this.actorDB.findById(id);
  };

  create = (actor) => {
    const actorToInsert = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return this.actorDB.create(actorToInsert);
  };

  update = (actorId, actor) => {
    const actorToUpdate = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return this.actorDB.update(actorId, actorToUpdate);
  };

  destroy = (actorId) => {
    this.actorDB.destroy(actorId)
  };

  dbFieldsObj = (objeto) => {
    const res = {};

    for (const clave in objeto) {
      if (!objeto[clave]) {
        continue;
      }

      const nuevaClave = dbFieldsName(clave);
      const nuevoJSON = JSON.parse(`{"${nuevaClave}" : "${objeto[clave]}"}`);
      res = { ...res, ...nuevoJSON };
    }
    return res;
  };


  dbFieldsName = (objFieldName) => {
    let res = "actor_id";

    switch (objFieldName) {
      case "actorId":
        res = "actor_id";
        break;
      case "firstName":
        res = "first_name";
        break;
      case "lastName":
        res = "last_name";
        break;
    }

    return res;
  };

}

export default ActorsService;