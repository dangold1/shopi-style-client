import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './reducers/products';
import { collectionReducer } from './reducers/collection';
import { shoppingListReducer } from './reducers/shopping-list';
import { searchReducer } from './reducers/search';
import { STORE_KEY } from '../utils/keys';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORE_KEY, serializedState);
    } catch (e) {
        console.log(e)
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem(STORE_KEY);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e)
        return undefined;
    }
}

const rootReducer = combineReducers({
    product: productReducer,
    shoppingList: shoppingListReducer,
    collection: collectionReducer,
    searchResults: searchReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancer(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;