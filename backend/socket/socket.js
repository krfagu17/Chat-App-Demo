import { Server, Socket } from "socket.io";
import express from "express"
import http from "http"

const app =express()

const server= http.createServer(app)

const io= new Server(server,{
    cors:{
       origin:"http://localhost:3000",
       methods:["GET","POST"]
    }
})

export const getReceiverSocketId=(receiverID)=>{
    console.log("userMap",userSocketMap)
   return userSocketMap[receiverID];
}

const userSocketMap={}


io.on("connection",(socket)=>{
    console.log("connected successfully ",socket.id)

    const userId = socket.handshake.query.userId;
    console.log("userID",userId)

    if(userId !== "undefined") userSocketMap[userId]=socket.id

    io.emit("getOnlineUser",Object.keys(userSocketMap))


    //socket.on disconnect 

    socket.on("disconnect",()=>{
        console.log("user disconnected ",socket.id)
        delete userSocketMap[userId]
        io.emit("getuserOnline",Object.keys(userSocketMap))

    })
})


export {app,io,server}