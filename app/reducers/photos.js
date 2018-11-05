import { SET_PHOTOS} from '../actions/types'
const initialState = [];

export default photos = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return action.data;
        default:
            return state
    }
}