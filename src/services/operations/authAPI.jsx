import toast from "react-hot-toast";
import { setLoading , setToken, setUser} from "../../slices/authSlice"
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis"

const {
    SIGNUP_API,
    LOGIN_API,
  } = endpoints

export function signUp({
    name,
    email,
    password,
    confirmPassword,
    navigate
}
    
  ) {
    return async(dispatch) => {
           const toastId = toast.loading("Loading...")
          dispatch(setLoading(true));
          try{
            const response = await apiConnector("POST",SIGNUP_API,{
                name,
                email,
                password,
                confirmPassword,
            })
            
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Signup successfully");
            navigate("/login");
          } catch(error){
            console.log("SIGN_UP ERROR ",error);
            toast.error("Signup falied");
            navigate("/signup");
          }
          toast.dismiss(toastId)
          dispatch(setLoading(false));

    }
  }



export function login(
    {email,
    password,
    navigate}){
        return async(dispatch) => {
            const toastId = toast.loading("Loading...")
            dispatch(setLoading(true));
            try{

                const response = await apiConnector("POST",LOGIN_API,{
                    email,
                    password,
                })

                if(!response.data.success){
                    throw new Error(response.data.message);
                }

                toast.success("Login successfully");
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.user))

                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("user", JSON.stringify(response.data.user))
                navigate("/")
            } catch(error){
                console.log("LOGIN FAILED ",error);
                toast.error("Login failed");
                navigate("/login");
            }
            toast.dismiss(toastId)
            dispatch(setLoading(false));
        }
    }


    

//     export const login = async ({ email, password, navigate },dispatch) => {
//         const toastId = toast.loading("Loading...");
//         dispatch(setLoading(true));
    
//         try {
//             const response = await apiConnector("POST", LOGIN_API, {
//                 email,
//                 password,
//             });
    
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
    
//             toast.success("Login successfully");
//             dispatch(setToken(response.data.token));
//             dispatch(setUser(response.data.user));
    
//             localStorage.setItem("token", JSON.stringify(response.data.token));
//             localStorage.setItem("user", JSON.stringify(response.data.user));
//             navigate("/");
//         } catch (error) {
//             console.log("LOGIN FAILED ", error);
//             toast.error("Login failed");
//             navigate("/login");
//         } finally {
//             toast.dismiss(toastId);
//             dispatch(setLoading(false));
//         }
// };
export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
    }