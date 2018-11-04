import { SET_PHOTOS} from '../constants'
const initialState = [];

export default photos = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            console.log(action);
            return action.data;
        default:
            return state
    }
}