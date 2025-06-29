const BASE_URL = import.meta.env.VITE_BASE_URL;
// AUTH ENDPOINTS
export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
}


export const friendEndpoints = {
    SEND_REQUEST_API : BASE_URL +  "/friend/send-request",
    GET_ALL_FRIENDS_API : BASE_URL +  "/friend/get-all-friends",
    GET_ALL_REQUESTS_API : BASE_URL + "/friend/get-all-requests",
    GET_ALL_USERS_API : BASE_URL + "/friend/get-random-users",
    ACCEPT_REQUEST_API : BASE_URL + "/friend/accept-request",
    REJECT_REQUEST_API : BASE_URL + "/friend/reject-request",
}

export const groupEndpoints = {
    GET_ALL_GROUPS_API : BASE_URL +  "/group/get-all-groups",
    CREATE_GROUP_API : BASE_URL + "/group/create-group",
    GET_ALL_GROUP_MESSAGES_API : BASE_URL + "/group/get-all-group-messages",
}

export const messageEndpoints = {
  GET_ALL_MESSAGES_API : BASE_URL + "/message/get-messages",
  SUMMARIZE_MESSAGES_API : BASE_URL + "/message/summarize"
}




//  router.post("/create-group",auth,createGroup);
//  router.post("/add-member",auth,addMember);
//  router.post("/remove-member",auth,removeMember);
//  router.post("/get-all-group-messages",auth,getAllGroupMessages);
//  router.post("/delete-group",auth,deleteGroup);
//  router.get("/get-all-groups",auth,getAllGroups);


// router.post("/accept-request",auth,acceptFriendRequest);
// router.post("/reject-request",auth,rejectFriendRequest);
// router.get("/get-all-friends",auth,getAllFriends);
// router.get("/get-all-requests",auth,getAllRequests);
// router.get("/get-all-sent-requests",auth,getAllSentRequests);