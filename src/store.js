import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
} from "./reducers/userReducers";

import {
  newGallonReducer,
  myGallonReducer,
  allGallonsReducer,
} from "./reducers/gallonReducers";

import {newStoreBranchReducer, allStoreBranchReducer} from "./reducers/storebranchReducers"

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  newGallon: newGallonReducer,
  myGallon: myGallonReducer,
  allUsers: allUsersReducer,
  allGallons: allGallonsReducer,
  newStoreBranch:newStoreBranchReducer,
  allStoreBranch:allStoreBranchReducer
});
const middleware = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
