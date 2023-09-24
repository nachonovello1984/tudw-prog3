const Actor = require("../database/actor");
const findAll = (filter, limit, offset, order, asc) => {

  //Obtengo los filtros para cada campo ya con el nombre que llevan en la BD.
  const sqlFilter = dbFieldsObj(filter);

  //Idem anterior pero para el campo por el que voy a hacer las ordenaciones.
  const sqlOrder = dbFieldsName(order);

  const strAsc = (asc) ? "ASC " : "DESC ";
  return Actor.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);
};

const findById = (id) => {
  return Actor.findById(id);
};

const create = (actor) => {
  const actorToInsert = {
    ...actor,
    lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
  }
  return Actor.create(actorToInsert);
};

const update = (actorId, actor) => {
  const actorToUpdate = {
    ...actor,
    lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
  }
  return Actor.update(actorId, actorToUpdate);
};

const destroy = (actorId) => {
  Actor.destroy(actorId)
};


const dbFieldsObj = (objeto) => {
  res = {};

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


const dbFieldsName = (objFieldName) => {
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

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};