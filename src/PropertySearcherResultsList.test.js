import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropertySearcherResultsList from './PropertySearcherResultsList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { initial_store_data } from "./redux/store";

Enzyme.configure({adapter: new Adapter() });

const quotes = [
    {
        "lenderName": "TFB Federal Credit Union",
        "loanType": "7/1 ARM",
        "interestRate": 3.5,
        "closingCosts": 2000,
        "monthlyPayment": 449.0446878088235,
        "apr": 3.660036729314016
    },
    {
        "lenderName": "Bates College Credit Union",
        "loanType": "10/1 ARM",
        "interestRate": 3.125,
        "closingCosts": 2570,
        "monthlyPayment": 4420.9621026749655,
        "apr": 3.396947112664067,
    }
]    

let store;
const mockStore = configureStore([]);
const setupComponent = () => {
store = mockStore({...initial_store_data, quotes});
  console.log(`store.getstate = ${store.getState()}`);
  console.log(store.getState());
  return (
    <Provider store={store}>
      <PropertySearcherResultsList />
    </Provider>
  )
}

it('renders correctly (matches snapshot)', () => {
    const tree = renderer
      .create(setupComponent())
      .toJSON();
    expect(tree).toMatchSnapshot();
});