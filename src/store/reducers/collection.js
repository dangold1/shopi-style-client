import {
    FETCH_COLLECTION_REQUEST,
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTION_FAIL,
} from '../constats/collection';

const initialState = { collection: {}, isLoading: false, error: null };

export const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTION_REQUEST:
            return { ...state, isLoading: true };
        case FETCH_COLLECTION_SUCCESS:
            return { ...state, isLoading: false, collection: action.payload };
        case FETCH_COLLECTION_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}