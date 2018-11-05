import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SET_PHOTOS} from './types'
import {search} from "../api/index";
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
        dispatch(getData());
        let oldData = getState().data;
        let newData=[];
        let keys = Object.keys(oldData);
        if (keys.includes(_.lowerCase(term)+"_"+ page)) {
            if (oldData && oldData[_.lowerCase(term) + "_" + page] && oldData[_.lowerCase(term) + "_" + page].length > 0) {
                newData = Object.assign({}, oldData);
                let key = '';
                let photos = [];
                for (let i = 0; i <= page; i++) {
                    key = _.lowerCase(term) + "_" + i;
                    if (newData[key] && newData[key].length > 0) {
                        photos = photos.concat(newData[key]);
                    }
                }
                newData.isFetching = false;
                _.uniqBy(photos, (item)=> item.id);

                dispatch(getPhotos(photos));
                dispatch(getDataSuccess(newData));


            }



        } else {
            search(term, page)
                .then((data) => {
                    const id = _.lowerCase(term) + "_" + page;
                    newData = Object.assign({}, getState().data);
                    newData[id] = data.data.photos.photo;
                    newData.isFetching = false;
                    let key = '';
                    let photos = [];
                    for (let i = 0; i <= page; i++) {
                        key = _.lowerCase(term) + "_" + i;
                        if (newData[key] && newData[key].length > 0) {
                            photos = [...photos,...newData[key]];
                        }
                    }

                    dispatch(getDataSuccess(newData));
                    dispatch(getPhotos(photos));

                })
                .catch((err) => {
                    console.log('err:', err);
                    dispatch(getDataFailure())
                })
        }
    }
}