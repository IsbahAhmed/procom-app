import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

var middleware = [thunk];

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
));
export const persistor = persistStore(store);
export default store;
