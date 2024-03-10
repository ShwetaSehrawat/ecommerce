import { takeEvery, put } from "redux-saga/effects"
import { ADD_BRAND, ADD_BRAND_RED, DELETE_BRAND, DELETE_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, UPDATE_BRAND_RED } from "../Constants"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/BrandService"
function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_BRAND_RED, payload: response })
}
function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_BRAND_RED, payload: response })
}
function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_BRAND_RED, payload: action.payload })
}
function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_BRAND_RED, payload: action.payload })
}


export default function* brandSaga() {
    yield takeEvery(ADD_BRAND, addSaga)
    yield takeEvery(GET_BRAND, getSaga)
    yield takeEvery(UPDATE_BRAND, updateSaga)
    yield takeEvery(DELETE_BRAND, deleteSaga)
}