import { ADD_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED } from "../Constants"
export default function ProductReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case GET_PRODUCT_RED:
            return action.payload.reverse()
        case ADD_PRODUCT_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState
        case UPDATE_PRODUCT_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].maincategory = action.payload.maincategory
            state[index].subcategory = action.payload.subcategory
            state[index].brand = action.payload.brand
            state[index].baseprice = action.payload.baseprice
            state[index].finalprice = action.payload.finalprice
            state[index].discount = action.payload.discount
            state[index].size = action.payload.size
            state[index].color = action.payload.color
            state[index].stock = action.payload.stock
            state[index].description = action.payload.description
            state[index].pic1 = action.payload.pic1
            state[index].pic2 = action.payload.pic2
            state[index].pic3 = action.payload.pic3
            state[index].pic4 = action.payload.pic4
            return state
        case DELETE_PRODUCT_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state
    }
}