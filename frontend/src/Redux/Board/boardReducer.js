import { ADD_BOARD, GET_BOARD } from "./boardConstants";

const initialState = {
  Data: null,
};

const boardReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case GET_BOARD:
      return { ...state, Data:payload };
    case ADD_BOARD:
        console.log(payload)
        return {...state,Data:[...state.Data,payload]}
    default:
      return state;
  }
};

export default boardReducer