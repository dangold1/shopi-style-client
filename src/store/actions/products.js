import { BASE_API_URL } from '../../utils/keys';
import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL, SET_SELECTED_PRODUCT,
} from '../constats/products';
import axios from 'axios';

export const updateSelectedProductAction = (newProduct) => (dispatch) => {
    dispatch({ type: SET_SELECTED_PRODUCT, payload: newProduct });
}

export const fetchProductAction = (collection, productID) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PRODUCT_REQUEST });
        const { data } = await axios.get(`${BASE_API_URL}/product/${collection}/${productID}`);
        dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_FAIL, payload: error.message });
    }
}