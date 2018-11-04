import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SET_PHOTOS} from '../constants'
import {search} from "./api";
import * as _ from 'lodash';


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

export function getPhotos(data) {
    return {
        type: SET_PHOTOS,
        data
    }
}


export function fetchData(term, page) {

    return (dispatch, getState) => {
        dispatch(getData())
        search(term, page)
            .then((data) => {
                const id = _.lowerCase(term) + "_" + page;
                let newData = Object.assign({},getState().data);
                newData[id] = data.data.photos.photo;
                let photos = newData[id];
                console.log("updating props",newData, newData[id]);
                dispatch(getDataSuccess(newData));
                dispatch(getPhotos(photos));

            })
            .catch((err) => {
                console.log('err:', err);
                dispatch(getDataFailure())
            })
    }
}