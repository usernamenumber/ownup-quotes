import { createStore } from 'redux';

export const initial_store_data = {
    quotes: [],
}

const prefix = 'PropertySearcher';
export const store = createStore(
    (state = initial_store_data, action) => {
        switch(action.type) {
            case `${prefix}/updateQuotes`:
                return {...state, quotes: action.payload};
            case `${prefix}/quotesUpdateStart`:
                return {...state, quotes_updating: true};
            case `${prefix}/quotesUpdateFinish`:
                return {...state, quotes_updating: false};

            default: 
                if ( ! action.type.startsWith('@')) {
                    console.warn(`redux store got unrecognized action '${action.type}'`);
                }
                return state;
        }
    } ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
); 

export default store;