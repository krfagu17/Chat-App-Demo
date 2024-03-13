import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import messageRoute from './routes/messageRoute.js';
import connectMongoDb from './db/connectMongoDb.js';
import { app,server } from './socket/socket.js';

dotenv.config();


const PORT=process.env.PORT || 3000; 

app.use(express.json());  //middleware to parse json data
app.use(cookieParser()); //middleware to parse cookies
app.use(cors()); //middleware to allow cross origin requests

app.use("/api/auth",authRoute)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoutes)

server.listen(PORT,()=>{
    connectMongoDb();
    console.log(`Server is running on port http://localhost:${PORT}`)
})





app.get("/",(req,res)=>{
        res.send("Hello World")
})