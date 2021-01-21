import {
    ADD_NEW_PRODUCT_TO_CART,
    INCREASE_PRODUCT_AMOUNT,
    DECREASE_PRODUCT_AMOUNT,
    EDIT_PRODUCT_SIZE,
    DELETE_PRODUCT_FROM_CART,
    SELECT_PAGE,
} from '../constats/shoppingListConstants';

export const addNewProductToCartAction = (newProduct) => async (dispatch) => {
    dispatch({ type: ADD_NEW_PRODUCT_TO_CART, payload: newProduct });
}

export const increaseProductAmountAction = (index) => async (dispatch) => {
    dispatch({ type: INCREASE_PRODUCT_AMOUNT, payload: index });
}

export const decreaseProductAmountAction = (index) => async (dispatch) => {
    dispatch({ type: DECREASE_PRODUCT_AMOUNT, payload: index });
}

export const editProductSizeAction = (index, newSize) => async (dispatch) => {
    dispatch({ type: EDIT_PRODUCT_SIZE, payload: { index, newSize } });
}

export const deleteProductAction = (uuid) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_FROM_CART, payload: uuid });
}

export const selectPaymentPageAction = (page) => async (dispatch) => {
    dispatch({ type: SELECT_PAGE, payload: page });
}