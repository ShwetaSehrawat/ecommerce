import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import RootReducer from "./Reducers/RootReducer"
import RootSaga from "./Sagas/RootSaga"

const sagaMiddleware = createSagaMiddleware()

const myStore = configureStore({
    reducer:RootReducer,
    middleware:()=>[sagaMiddleware]
})
export default myStore

sagaMiddleware.run(RootSaga)