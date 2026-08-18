"use strict";
import Pet from "../entity/pet.entity.js";
import { AppDataSource } from "../config/configDb.js";

const petRepository = AppDataSource.getRepository(Pet);

export async function getPets() {
  try {
    const pets = (await petRepository.find()) || [];
    return [pets, null];
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAvailablePets() {
  try {
    const pets = (await petRepository.find( { where: { hasOwner: false } } )) || [];
    return [pets, null];
  } catch (error) {
    console.error("Error al obtener mascotas disponibles:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getPetById(id) {
  try {
    const pet = (await petRepository.findOne( { where: { id: id } } )) || null;
    if (!pet) {
      return [null, `Mascota #${id} no encontrada`];
    }
    return [pet, null];
  } catch (error) {
    console.error(`Error al encontrar mascota #${id}: `, error);
    return [null, `Mascota #${id} no encontrada`];
  }
}

export async function registerPet(data) {
  try {
    const newPet = await petRepository.create(data);
    const saved = await petRepository.save(newPet);
    if (saved.length !== 0) {
      return [saved[0], null];
    }
    return [null, `Error al registrar a ${newPet?.name || data?.name || "la mascota"}`];
  } catch (error) {
    console.error("Error al registrar mascota: ", error);
    return [null, `Error al registrar a ${data?.name || "la mascota"}`];
  }
}

export async function updatePet(id, data) {
  try {
    const pet = (await getPetById(id))[0];
    if (!pet) {
      return [null, `Mascota #${id} no encontrada`];
    }
    Object.assign(pet, data);
    const updatedPet = await petRepository.save(pet);
    if (updatedPet.length === 0) {
      return [null, "No se actualizó ninguna mascota"];
    }
    return [updatedPet[0], null];
  } catch (error) {
    console.error(`Error al actualizar mascota #${id}: `, error);
    return [null, `Error al actualizar a ${newPet?.name || data?.name || `#${id}` || "la mascota"}`];
  }
}

export async function deletePet(id) {
  try {
    const pet = (await getPetById(id))[0];
    if (!pet) {
      return [null, `Mascota #${id} no encontrada`];
    }
    const deletedPet = await petRepository.delete(pet); 
    if (deletePet.length !== 1) {
      return [false, `Error al eliminar mascota #${id}`];
    }
    return [true, null];
  } catch (error) {
    console.error(`Error al eliminar mascota #${id}: `, error);
    return [null, `Error al eliminar mascota #${id}`];
  }
}

/*
export async function getUserService(query) {
  try {
    const { rut, id, email } = query

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const { password, ...userData } = userFound;

    return [userData, null];
  } catch (error) {
    console.error("Error obtener el usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getUsersService() {
  try {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    if (!users || users.length === 0) return [null, "No hay usuarios"];

    const usersData = users.map(({ password, ...user }) => user);

    return [usersData, null];
  } catch (error) {
    console.error("Error al obtener a los usuarios:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateUserService(query, body) {
  try {
    const { id, rut, email } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    const existingUser = await userRepository.findOne({
      where: [{ rut: body.rut }, { email: body.email }],
    });

    if (existingUser && existingUser.id !== userFound.id) {
      return [null, "Ya existe un usuario con el mismo rut o email"];
    }

    if (body.password) {
      const matchPassword = await comparePassword(
        body.password,
        userFound.password,
      );

      if (!matchPassword) return [null, "La contraseña no coincide"];
    }

    const dataUserUpdate = {
      nombreCompleto: body.nombreCompleto,
      rut: body.rut,
      email: body.email,
      rol: body.rol,
      updatedAt: new Date(),
    };

    if (body.newPassword && body.newPassword.trim() !== "") {
      dataUserUpdate.password = await encryptPassword(body.newPassword);
    }

    await userRepository.update({ id: userFound.id }, dataUserUpdate);

    const userData = await userRepository.findOne({
      where: { id: userFound.id },
    });

    if (!userData) {
      return [null, "Usuario no encontrado después de actualizar"];
    }

    const { password, ...userUpdated } = userData;

    return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteUserService(query) {
  try {
    const { id, rut, email } = query;

    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({
      where: [{ id: id }, { rut: rut }, { email: email }],
    });

    if (!userFound) return [null, "Usuario no encontrado"];

    if (userFound.rol === "administrador") {
      return [null, "No se puede eliminar un usuario con rol de administrador"];
    }

    const userDeleted = await userRepository.remove(userFound);

    const { password, ...dataUser } = userDeleted;

    return [dataUser, null];
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    return [null, "Error interno del servidor"];
  }
}
*/