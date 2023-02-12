import express from "express";
import { getUser, createUser, getAllUsers } from "../../handlers/api/users";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/:id", auth, getUser);
router.post("/", createUser);

export default router;
