import { createContext, useEffect, useState,useContext} from "react";
import {  useAuthContext } from "./AuthContext";
import {io} from "socket.io-client"


export const SocketContext=createContext()

export const useSocketContext=()=>{
    return  useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null)
    const [userOnline,setUserOnline]=useState("")
    const {userAuth} =useAuthContext()
    // console.log("user Auth",userAuth._id)

    useEffect(()=>{
        if(userAuth){
           const socket =io('http://localhost:5000',
           {
            query:{
                userId:userAuth._id
            }
           })

           setSocket(socket)

           socket.on("getOnlineUser",(user)=>{
            setUserOnline(user)
           })

            return ()=>socket.close()
        }else {
            if(socket){
                socket.close()
                setSocket(null)
            }

        }
    },[userAuth])
 return <SocketContext.Provider value={{socket,userOnline}}>
    {children}
 </SocketContext.Provider>
}