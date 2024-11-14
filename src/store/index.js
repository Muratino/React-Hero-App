import reducer from '../reducers/heroesSlice';
import { configureStore, } from '@reduxjs/toolkit';

// import { createStore, compose, applyMiddleware } from 'redux';
// import reducer from '../reducers';
// import ReduxThink from 'redux-thunk';


// Функции middleware - это функции по добавлению функционала в функцию dispatch
const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    } return dispatch(action)
}


// Функции enhancer - это функции усилитель, возможность добавлять функционал куда угодно, в store и так далее
const enhancer = (creactStore) => (...args) => { // eslint-disable-line
    const store = creactStore(...args);

    const oldDispatch = store.dispatch;

    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        } return oldDispatch(action)
    }

    return store;
}

// Redux/toolkit
const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',

});

export default store;


// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const store = createStore(reducer, compose(applyMiddleware(ReduxThink, stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ));



