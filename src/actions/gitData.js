
import types from './types'
const url="https://api.github.com/users/supreetsingh247/repos"
export function getItems() {
    return async (dispatch) => {
        dispatch({
            type: types.getItems,
        });
    fetch(url , { method: 'GET' })
    .then((resp) => resp.json())
    .then((resp) => {
        if (resp.length >0)
            dispatch({
                type: types.getItemsSuccess,
                payload: { data: resp }
            });
        else
            dispatch({
                type: types.getItemsFailure,
            });

    })
    .catch((err) => {
        console.log(err)
        dispatch({
            type: types.getItemsFailure,
        });
    })
}
}