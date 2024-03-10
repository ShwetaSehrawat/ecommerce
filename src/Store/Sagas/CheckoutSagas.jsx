import { takeEvery, put } from "redux-saga/effects"
import { ADD_CHECKOUT, ADD_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CheckoutService"
function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CHECKOUT_RED, payload: response })
}
function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}
function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}
function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}


export default function* checkoutSaga() {
    yield takeEvery(ADD_CHECKOUT, addSaga)
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)
}