import { Router } from "express";
const router = Router();
import userRouter from './user.js'

router.use("/site", userRouter);

export default router;

