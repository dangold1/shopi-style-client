import { BASE_API_URL } from '../../utils/keys';
import {
    FETCH_COLLECTION_REQUEST, FETCH_COLLECTION_SUCCESS, FETCH_COLLECTION_FAIL,
} from '../constats/collectionConstants';
import axios from 'axios';

export const fetchCollectionAction = (collection, body) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_COLLECTION_REQUEST });
        const { data } = await axios.post(`${BASE_API_URL}/collection/${collection}`, body);
        dispatch({ type: FETCH_COLLECTION_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_COLLECTION_FAIL, payload: error.message });
    }
}