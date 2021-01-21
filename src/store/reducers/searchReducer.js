import {
    FETCH_MATCH_PRODUCTS_REQUEST,
    FETCH_MATCH_PRODUCTS_SUCCESS,
    FETCH_MATCH_PRODUCTS_FAIL
} from '../constats/autoCompleteConstants';

const initialState = { searchResults: [], isLoading: false, error: null };

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MATCH_PRODUCTS_REQUEST:
            return { ...state, isLoading: true };

        case FETCH_MATCH_PRODUCTS_SUCCESS:
            let results = action.payload.map(item => { return { label: item.caption , item } })
            return { ...state, isLoading: false, searchResults: results };

        case FETCH_MATCH_PRODUCTS_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}

