import { apiConnector } from "../apiConnector";
import { friendEndpoints } from "../apis";
import {toast} from "react-hot-toast";


const {GET_ALL_FRIENDS_API,GET_ALL_REQUESTS_API,GET_ALL_USERS_API,SEND_REQUEST_API,
        ACCEPT_REQUEST_API,REJECT_REQUEST_API
} = friendEndpoints;

export const getAllFriends = async(token) => {
    let result = null;
    //const toastId = toast.loading("Loading");

    try{
        const response = await apiConnector("GET",GET_ALL_FRIENDS_API,null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Friends")
          }
        result = response?.data?.data
    }catch(error){
        console.log("GET_ALL_FRIENDS_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
    
}


export const getAllRequests = async(token) => {
    let result = null;
    //const toastId = toast.loading("Loading");

    try{
        const response = await apiConnector("GET",GET_ALL_REQUESTS_API,null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Request")
          }

        //toast.success("Category created successfully");
        result = response?.data?.data
    }catch(error){
        console.log("GET_ALL_REQUESTS_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}




export const getAllUsers = async(token) => {
    let result = null;
    //const toastId = toast.loading("Loading");

    try{
        const response = await apiConnector("GET",GET_ALL_USERS_API,null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Users")
          }
        result = response?.data?.data
    }catch(error){
        console.log("GET_ALL_USERS_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}


export const sendFriendRequest = async({receiverId},token)=>{
    //const toastId = toast.loading("Loading...");
    let result = false;
    try{
        const response = await apiConnector("POST",SEND_REQUEST_API,{receiverId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not send request")
          }
          result = true;
        toast.success("Request sent successfully");
    }catch(error){
        console.log("SEND_REQUEST_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}


export const acceptFriendRequest = async({senderId},token)=>{
    //const toastId = toast.loading("Loading...");
    let result = false;
    try{
        const response = await apiConnector("POST",ACCEPT_REQUEST_API,{senderId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not accept request")
          }
          result = true;
        //toast.success("Request sent successfully");
    }catch(error){
        console.log("ACCEPT_REQUEST_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}


export const rejectFriendRequest = async({senderId},token)=>{
    //const toastId = toast.loading("Loading...");
    let result = false;
    try{
        const response = await apiConnector("POST",REJECT_REQUEST_API,{senderId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not reject request")
          }
          result = true;
        //toast.success("Request sent successfully");
    }catch(error){
        console.log("REJECT_REQUEST_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}