import express from "express";
import { welcome, register } from "../controllers/users.js";

const router = express.Router();

router.get("/", welcome);
router.post("/register", register);

export default router;
