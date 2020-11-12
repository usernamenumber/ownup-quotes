import { createStore } from 'redux'

const store = createStore(
    (state = {quotes: []}, action) => {
        switch(action.type) {
            case 'PropertySearcher/updateQuotes':
                return {...state, quotes: action.payload};
            default: 
                if ( ! action.type.startsWith('@')) {
                    console.warn(`redux store got unrecognized action '${action.type}'`);
                }
                return state;
        }
    } ,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store;