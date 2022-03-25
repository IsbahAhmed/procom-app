import { toast } from "react-toastify";
import { request } from "../../axios";
import { ADD_BOARD, GET_BOARD } from "./boardConstants";

export const getBoard = ()=> async dispatch => {
    try {
        const response = await request.get("/board/list");
        if(response.statusCode == 403) return toast.error("Failed");
        dispatch({
            type:GET_BOARD,
            payload: response.data.Data
        })
    } catch (error) {
        console.log(error);
    }
}
export const addBoard = (obj)=> async (dispatch)=>{
    try {
        const response = await request.post("/board",obj);
        if(response.data.status !== "failed")
        dispatch({
            type:ADD_BOARD,
            payload: response.data.message
        })
    } catch (error) {   
        console.log(error)
    }
} 
export const addMember = (obj)=> async (dispatch)=>{
    try {
        const response = await request.post("/board/addMembers",obj);
        console.log(response)
        if(response.data.status !== "failed") toast.success("Success")
        // dispatch({
        //     type:ADD_BOARD,
        //     payload: response.data.message
        // })
    } catch (error) {   
        console.log(error)
    }
} 
export const addCard = (obj)=> async (dispatch)=>{
    try {
        const response = await request.post("/card",obj);
        console.log(response)
        if(response.data.status !== "failed") toast.success("Success")
        // dispatch({
        //     type:ADD_BOARD,
        //     payload: response.data.message
        // })
    } catch (error) {   
        console.log(error)
    }
} 