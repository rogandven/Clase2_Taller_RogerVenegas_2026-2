"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { deletePetController, 
        getAvailablePetsController, 
        getPetController, 
        getPetsController, 
        updatePetController 
} from "../controllers/pet.controller.js";

const router = Router();

router
  .use(authenticateJwt);

router
  .get("/", getPetsController)
  .get("/available/", getAvailablePetsController)
  .get("/specific/:id", getPetController)
  .post("/", regsi)
  .patch("/:id", updatePetController)
  .delete("/:id", deletePetController);

export default router;