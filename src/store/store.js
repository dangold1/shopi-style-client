import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './reducers/productsReducer';
import { collectionReducer } from './reducers/collectionReducer';
import { shoppingListReducer } from './reducers/shoppingListReducer';
import { searchReducer } from './reducers/searchReducer';
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