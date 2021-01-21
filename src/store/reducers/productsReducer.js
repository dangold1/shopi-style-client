import {
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
    SET_SELECTED_PRODUCT,
} from '../constats/productsConstants';

const initialState = { product: {}, isLoading: false, error: null };

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return { ...state, isLoading: true };

        case FETCH_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, product: action.payload };

        case FETCH_PRODUCT_FAIL:
            return { ...state, isLoading: false, error: action.payload };

        case SET_SELECTED_PRODUCT:
            return { ...state, product: action.payload };

        default:
            return state;
    }
}

