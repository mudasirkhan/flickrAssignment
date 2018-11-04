import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import data from "./dataReducer"
import photos from "./photos";


const config = {
    key: 'flickrConfig',
    whitelist: ['data'],
    storage: AsyncStorage
};

const reducer = persistCombineReducers(config, {
    data: data,
    photos: photos
});

const store = createStore(reducer, applyMiddleware(thunk));

let reHydratedResolver = null;
const reHydratedStore = new Promise(resolve => {
    reHydratedResolver = resolve;
});

persistStore(store, null, () => {
    console.log("rehydration complete")
    reHydratedResolver();
});

export { reHydratedStore };
export default store;
