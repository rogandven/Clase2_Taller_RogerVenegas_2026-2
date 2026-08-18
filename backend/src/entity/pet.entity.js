"use strict";
import { EntitySchema } from "typeorm";

const PetSchema = new EntitySchema({
  name: "Pet",
  tableName: "pets",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    species: {
      type: "varchar",
      length: 25,
      nullable: false,
    },
    birthDate: {
      type: "date",
      nullable: false,
    },
    hasOwner: {
      type: "boolean",
      nullable: false,
    }
  },
  indices: [
    {
      name: "IDX_PET",
      columns: ["id"],
      unique: true,
    },
  ],
});

export default PetSchema;