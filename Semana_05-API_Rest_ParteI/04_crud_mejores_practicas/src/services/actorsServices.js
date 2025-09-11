import Actors from "../database/actors.js";
import ActorDTO from "../database/actorDTO.js";

export default class ActorsServices {

  constructor() {
    this.actors = new Actors();
  }

  findAll = async (filter, limit, offset, order, asc) => {

    //Obtengo los filtros para cada campo ya con el nombre que llevan en la BD.
    const sqlFilter = ActorDTO.toDBFields(filter);

    //Idem anterior pero para el campo por el que voy a hacer las ordenaciones.   
    const sqlOrder = ActorDTO.getFieldName(order);

    const strAsc = (asc) ? "ASC " : "DESC ";
    const tableResults = await this.actors.findAll(sqlFilter, limit, offset, sqlOrder, strAsc);

    const dtoResults = tableResults.map(row => new ActorDTO(row["actor_id"], row["first_name"], row["last_name"], row["last_update"]));

    return dtoResults;
  }

  findById = async (id) => {
    const row = await this.actors.findById(id);
    return new ActorDTO(row["actor_id"], row["first_name"], row["last_name"], row["last_update"]);
  }

  create = async (actor) => {
    const actorToInsert = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return this.actors.create(actorToInsert);
  }

  update = async (actorId, actor) => {
    const actorToUpdate = {
      ...actor,
      lastUpdate: new Date().toISOString().replace('T', ' ').replace('Z', '')
    }
    return this.actors.update(actorId, actorToUpdate);
  }

  destroy = async (actorId) => {
    this.actors.destroy(actorId);
  }

};