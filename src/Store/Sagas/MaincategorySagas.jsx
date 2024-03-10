import { takeEvery, put } from "redux-saga/effects"
import { ADD_MAINCATEGORY, ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/MaincategoryService"
function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_MAINCATEGORY_RED, payload: response })
}
function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}
function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}
function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}


export default function* maincategorySaga() {
    yield takeEvery(ADD_MAINCATEGORY, addSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}