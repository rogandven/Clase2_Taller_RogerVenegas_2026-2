"use strict";

import { handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import { deletePet, getAvailablePets, getPetById, getPets, updatePet } from "../services/pet.service.js";

export async function getPetsController(req, res) {
    const pets = await getPets();
    if (pets[1]) {
        return handleErrorServer(res, 500, pets[1]);
    }
    return handleSuccess(res, pets[0].length === 0 ? 201 : 200, pets[0]);
}

export async function getAvailablePetsController(req, res) {
    const pets = await getAvailablePets();
    if (pets[1]) {
        return handleErrorServer(res, 500, pets[1]);
    }
    return handleSuccess(res, pets[0].length === 0 ? 201 : 200, pets[0]);    
}

export async function getPetController(req, res) {
    const pet = await getPetById(req?.params?.id || 0);
    if (pet[1]) {
        return handleErrorServer(res, 404, pet[1]);
    }
    return handleSuccess(res, 200, "¡Mascota encontrada con éxito!", pet[0]);    
}

export async function updatePetController(req, res) {
    const updatedPet = await updatePet(req?.params?.id || 0);
    if (updatePet[1]) {
        return handleErrorServer(res, 500, updatePet[1]);
    }
    return handleSuccess(res, 200, "¡Mascota actualizada con éxito!", updatePet[0]);
}

export async function deletePetController(req, res) {
    const deletedPet = await deletePet(req?.params.id || 0);
    if (deletedPet[1]) {
        return handleErrorServer(res, 500, updatePet[1]);
    }
    return handleSuccess(res, 200, "¡Mascota eliminada con éxito!", deletedPet[0]);
}