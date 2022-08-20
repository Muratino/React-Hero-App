import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetchingError, heroesFetched } from '../reducers/heroesSlice';


export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched = createAction('HEROES_FETCHED');
// export const newHeroesFetched = createAction('NEW_HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }



// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }


// export const newHeroesFetched = (value) => {
//     return {
//         type: 'NEW_HEROES_FETCHED',
//         payload: value
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }
