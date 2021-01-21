import { BASE_API_URL } from '../../utils/keys';
import {
    FETCH_MATCH_PRODUCTS_REQUEST,
    FETCH_MATCH_PRODUCTS_SUCCESS,
    FETCH_MATCH_PRODUCTS_FAIL,
} from '../constats/autoCompleteConstants';
import axios from 'axios';

export const searchAction = (text) => async (dispatch) => {
    try {
        await new Promise(resolve => setTimeout(resolve, 50));
        if (text.length < 2) {
            dispatch({ type: FETCH_MATCH_PRODUCTS_SUCCESS, payload: [] });
            return;
        }
        dispatch({ type: FETCH_MATCH_PRODUCTS_REQUEST });
        const { data } = await axios.get(`${BASE_API_URL}/products?text=${text}`);
        dispatch({ type: FETCH_MATCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_MATCH_PRODUCTS_FAIL, payload: error.message });
    }
}

