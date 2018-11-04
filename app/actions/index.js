import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from '../constants'
import {search} from "./api";


export function getData() {
    return {
        type: FETCHING_DATA
    }
}

export function getDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        data,
    }
}

export function getDataFailure() {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export function fetchData(term, page) {

    return (dispatch, getState) => {
        dispatch(getData())
        search(term, page)
            .then((data) => {
                let newData = Object.assign({},getState().data);
                newData[term] = data.data.photos.photo;
                console.log(newData);
                dispatch(getDataSuccess(newData))

            })
            .catch((err) => {
                console.log('err:', err)
                dispatch(getDataFailure())
            })
    }
}