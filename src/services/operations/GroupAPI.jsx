import { groupEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import {toast} from "react-hot-toast";



const {CREATE_GROUP_API,GET_ALL_GROUPS_API,GET_ALL_GROUP_MESSAGES_API} = groupEndpoints;


export const createGroup = async({name,members},token) => {
    const toastId = toast.loading("Loading...");
    let result = false;
    try{
        const response = await apiConnector("POST",CREATE_GROUP_API,{name,members},
            {
                Authorization : `Bearer ${token}`
            }
        )
        
        if (!response?.data?.success) {
            throw new Error("Could Not Fetc Friends")
          }
          result = true;
        toast.success("Group created successfully");
        // result = response?.data?.data
    }catch(error){
        console.log("CREATE_GROUP_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        toast.dismiss(toastId);
        return result;
    }
}


export const getAllGroups = async(token) => {
    let result=null;
   // const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("GET",GET_ALL_GROUPS_API,null,
            {
                Authorization : `Bearer ${token}`
            }
        )
        if (!response?.data?.success) {
            throw new Error("Could Not Fetc Friends")
          }

        result = response?.data?.data
    }catch(error){
        console.log("CREATE_GROUP_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}



export const getAllGroupMessage= async({groupId},token) => {
    let result=null;
    //const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",GET_ALL_GROUP_MESSAGES_API,{groupId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch group messages")
          }

        result = response?.data?.data
    }catch(error){
        console.log("CREATE_GROUP_API ERROR",error);
        toast.error("SOME ERROR OCCURED");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
}
