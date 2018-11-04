import axios from 'axios';
import api from '../constants/api';
const search = (term, page) => {
    return new Promise((resolve, reject) => {
        axios.post(api.baseApi + term +'&page=' + page)
            .then(
                resp => {
                    console.log(resp)
                    return resolve(resp);
                }
            )
            .catch(err => {
                console.log(err)
                return reject(err.response || err);
            })
    })
}
export {search}