import { takeEvery, put } from "redux-saga/effects"
import { ADD_TESTIMONIAL, ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL, UPDATE_TESTIMONIAL_RED } from "../Constants"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/TestimonialService"
function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_TESTIMONIAL_RED, payload: response })
}
function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_TESTIMONIAL_RED, payload: response })
}
function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_TESTIMONIAL_RED, payload: action.payload })
}
function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_TESTIMONIAL_RED, payload: action.payload })
}


export default function* testimonialSaga() {
    yield takeEvery(ADD_TESTIMONIAL, addSaga)
    yield takeEvery(GET_TESTIMONIAL, getSaga)
    yield takeEvery(UPDATE_TESTIMONIAL, updateSaga)
    yield takeEvery(DELETE_TESTIMONIAL, deleteSaga)
}