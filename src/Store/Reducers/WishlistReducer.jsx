import { ADD_WISHLIST_RED, DELETE_WISHLIST_RED, GET_WISHLIST_RED } from "../Constants"
export default function wishlistReducer(state = [], action) {
    let newState
    switch (action.type) {
        case GET_WISHLIST_RED:
            return action.payload.reverse()
        case ADD_WISHLIST_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState
        case DELETE_WISHLIST_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state
    }
}