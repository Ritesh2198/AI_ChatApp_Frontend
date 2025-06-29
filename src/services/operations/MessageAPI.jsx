import {toast} from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { messageEndpoints } from "../apis";

const {GET_ALL_MESSAGES_API,SUMMARIZE_MESSAGES_API} = messageEndpoints;

export const getAllMessages= async({receiverId},token) => {
    let result=null;
    //const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",GET_ALL_MESSAGES_API,{receiverId},
            {
                Authorization : `Bearer ${token}`
            }
        )
        if(!response?.data?.success){
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


export const summarizeChat = async ({messages},token) => {
    console.log(messages);
    const chatMessages = messages.map((message) => message);
    let result=null;
    //const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",SUMMARIZE_MESSAGES_API,{chatMessages},
            {
                Authorization : `Bearer ${token}`
            }
        )
        if(!response?.data?.success){
            throw new Error("Could Not Summarize messages")
        }
        console.log(response.data.data);
         result = response?.data?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available";
        //result = response?.data?.data
    }catch(error){
        console.log("SUMMARIZE_MESSAGES_API ERROR",error);
        toast.error("SOME ERROR OCCURED2");
    }
    finally{
        //toast.dismiss(toastId);
        return result;
    }
};
