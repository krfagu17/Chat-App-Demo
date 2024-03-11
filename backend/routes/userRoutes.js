import express from 'express';
import { getUserForSideBar } from '../controller/userControllers.js';
import protectedRoute from '../middleware/proctectedRoute.js';

const router = express.Router();

router.post("/",protectedRoute,getUserForSideBar);

export default router;