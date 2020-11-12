import './PropertySearcher.css';
import PropertySearcherForm from './PropertySearcherForm.js';
import { Provider } from 'react-redux'
import store from './redux/store'
import PropertySearcherResultsList from './PropertySearcherResultsList';

const PropertySearcher = (props) => {
    return (
        <Provider store={store}>
            <div className="propertySearcher">
                <PropertySearcherForm/>
                <PropertySearcherResultsList/> 
            </div>
        </Provider>
    )
}

export default PropertySearcher;