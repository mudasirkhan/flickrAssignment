//import axios from 'axios';
import axios from '../api/client';
export const search = (term, page) => {
    return new Promise((resolve, reject) => {
        axios.post(term +'&page=' + page)
            .then(
                resp => {
                    return resolve(resp);
                }
            )
            .catch(err => {
                return reject(err.response || err);
            })
    })
}
