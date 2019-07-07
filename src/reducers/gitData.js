import types from '../actions/types'
const initialState = {
    items: []
}

const gitData = (state = [], action) => {
    switch (action.type) {
        case types.getItems:
            // return [...state, { _id: 'temp', item_name: action.payload.item }]
            return state
            break
        case types.getItemsSuccess:
        return action.payload.data
            break
        case types.getItemsFailure:
           
            return state
            break
        default:return state;
    }
}
export default gitData
