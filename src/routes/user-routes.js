import express from "express";
import { loginUser, getUserInfo } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/getUserInfo", getUserInfo);

export default router;
