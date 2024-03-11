import express from 'express';
import { getMessages, sendMessage, } from '../controller/messageController.js';
import protectedRoute from '../middleware/proctectedRoute.js';
import protectedRouteforMsg from '../middleware/protectedRouteforMsg.js';

const router = express.Router(); 

router.post("/:id",protectedRouteforMsg,getMessages);
router.post("/send/:id",protectedRouteforMsg,sendMessage);

export default router;