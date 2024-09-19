import Actors from "../database/actors.js";

export default class ActorsServices {

  constructor(){
    this.actors = new Actors();
  }

  findAll = (filter, limit, offset, order, asc) => {

    //Obtengo los filtros para cada campo ya con el nombre que llevan en la BD.
    const sqlFilter = this.dbFieldsObj(filter);

    //Idem anterior pero para el campo por el que voy a hacer las ordenaciones.
    const sqlOrder = this.dbFieldsName(order);

    const strAsc = (asc) ? "ASC " : "DESC ";
    return this.actors.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
  }

  findById = (id) => {
    return this.actors.findById(id);
  }

  create = (actor) => {
    const actorToInsert = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return actor.create(actorToInsert);
  }

  update = (actorId, actor) => {
    const actorToUpdate = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return this.actors.update(actorId, actorToUpdate);
  }

  destroy = (actorId) => {
    this.actors.destroy(actorId)
  }

  dbFieldsObj = (objeto) => {
    let res = {};

    for (const clave in objeto) {
      if (!objeto[clave]) {
        continue;
      }

      const nuevaClave = this.dbFieldsName(clave);
      const nuevoJSON = JSON.parse(`{"${nuevaClave}" : "${objeto[clave]}"}`);
      res = { ...res, ...nuevoJSON };
    }
    return res;
  }


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
  }
};