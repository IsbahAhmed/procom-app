import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { REGISTER_USER, REMOVE_USER, SIGNIN_USER } from "./userConstants";

const initialState = {
  Data: null,
  token:null
};
const userReducer = persistReducer(
  {
    storage,
    key: "v726-auth",
    whitelist: ["token", "Data"]
  },
  (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case SIGNIN_USER:
            localStorage.setItem("token",payload.token)
            return {...state,...payload};
        case REGISTER_USER:
            localStorage.setItem("token",payload.token)
            return {...state,...payload};
        case REMOVE_USER:
            localStorage.removeItem("token");
            return initialState
      default:
        return state;
    }
  }
);
export default userReducer;
