import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    tab : "Groups",
    // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    groupId : null,
    receiverId : null,
    // selectedReceiver : null,
    // selectedGroup : null,
    selectedChat : null,
    page : 1,
    messages : [],
}


const chatSlice = createSlice({
    name : "chat",
    initialState,
    reducers : {
        setTab(state, value){
        state.tab = value.payload;
        },
        setReceiverId(state, value){
        state.receiverId = value.payload;
        },
        setGroupId(state, value){
        state.groupId = value.payload;
        },
        // setSelectedGroup(state, value) {
        // state.selectedGroup = value.payload;
        // },

        setSelectedChat(state, value){
        state.selectedChat = value.payload;
        },
        // setSelectedReceiver(state, value) {
        // state.selectedReceiver = value.payload;
        // },
        setMessages(state, value){
        state.messages = value.payload;
        },

        setPage(state,value){
            state.page=value.payload;
        }
    }
    
})


export const { setTab,setReceiverId,setGroupId,setMessages,setSelectedChat,setPage} = chatSlice.actions;

export default chatSlice.reducer;