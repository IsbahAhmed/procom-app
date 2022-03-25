import { request } from "../../axios"
import { REGISTER_USER, REMOVE_USER, SIGNIN_USER } from "./userConstants"

export const signin =  (userObj) => async (dispatch) => {
    try {
        const response = await request.post("/user/signin",userObj);
        if(response.data.status === "failed") return 0;
       
        dispatch({
            type: SIGNIN_USER,
            payload:{
                Data:response.data.Data,
                token: response.data.token
            }
        })
        console.log(response)
        return 1
    } catch (error) {
        console.log(error)
        return 0
    }
}
export const signup =  (userObj) => async (dispatch) => {
    try {
        const response = await request.post("/user",userObj);
        if(response.data.status === "failed") return 0;
        dispatch({
            type: REGISTER_USER,
            payload:{
                Data:response.data.Data,
                token: response.data.token
            }
        })
        return 1
    } catch (error) {
        console.log(error)
        return 0
    }
}
export const logout = ()=>({
type:REMOVE_USER
})