import {
    ADD_NEW_PRODUCT_TO_CART,
    DELETE_PRODUCT_FROM_CART,
    EDIT_PRODUCT_SIZE,
    INCREASE_PRODUCT_AMOUNT,
    DECREASE_PRODUCT_AMOUNT,
    SELECT_PAGE,
} from '../constats/shopping-list';

import { cloneDeep } from 'lodash';

const initialState = { shoppingList: [], paymentPage: null, isLoading: false, error: null }

export const shoppingListReducer = (state = initialState, action) => {
    let newList = cloneDeep(state.shoppingList);
    let productIndex = action.payload;

    switch (action.type) {
        case ADD_NEW_PRODUCT_TO_CART:
            let product = action.payload
            product.amount = 1
            newList.push(product)
            return { ...state, shoppingList: newList };

        case INCREASE_PRODUCT_AMOUNT:
            productIndex = action.payload
            newList[productIndex].amount++
            return { ...state, shoppingList: newList };

        case DECREASE_PRODUCT_AMOUNT:
            productIndex = action.payload
            newList[productIndex].amount--
            if (newList[productIndex].amount === 0) newList.splice(productIndex, 1)
            return { ...state, shoppingList: newList };

        case EDIT_PRODUCT_SIZE:
            let { index, newSize } = action.payload
            newList[index].selectedSize = newSize
            return { ...state, shoppingList: newList };

        case DELETE_PRODUCT_FROM_CART:
            let uuid = action.payload
            return { ...state, shoppingList: newList.filter(item => item.uuid !== uuid) };

        case SELECT_PAGE:
            return { ...state, paymentPage: action.payload };
        default:
            return state;
    }
}
