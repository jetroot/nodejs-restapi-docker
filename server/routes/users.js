import express from "express";
import { welcome } from "../controllers/users.js";

const router = express.Router();

router.get("/", welcome);

export default router;