import Axios from 'axios';
import config from './config.js';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PropertySearcherForm from './PropertySearcherForm.js';
import React from 'react';
import redux_actions from './redux/actions';
import initial_store_data from './redux/store';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

jest.mock('axios');
Enzyme.configure({adapter: new Adapter() });
const mockStore = configureStore([]);


let store;
const setupComponent = () => {
  store = mockStore(initial_store_data);
  return (
    <Provider store={store}>
      <PropertySearcherForm />
    </Provider>
  )
}

it('renders correctly (matches snapshot)', () => {
  const tree = renderer
    .create(setupComponent())
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('PropertySearcherForm API interactions', () => {

  const formData = {
    loanSize: "100000",
    propertyType: "Townhouse",
    creditScore: "600",
    occupancy: "Investment",
  }

  const ownUpReturnData = {
    "rateQuotes": [
      {
        "lenderName": "TFB Federal Credit Union",
        "loanType": "7/1 ARM",
        "interestRate": 3.5,
        "closingCosts": 2000,
        "monthlyPayment": 449.0446878088235,
        "apr": 3.660036729314016
      }
    ]    
  };

  let wrapper;
  beforeEach(() => {
    // This needs to be a full render, not shallow, for enzyme to work
    // https://github.com/enzymejs/enzyme/issues/2196
    wrapper = Enzyme.mount(setupComponent());
    Axios.get.mockResolvedValue({
      data: ownUpReturnData
    });

    // submit the form with values from formData
    const form = wrapper.find('form').first();
    for ( let fieldName in formData ) {
      const val = formData[fieldName];
      const field = form.find('#' + fieldName).first();
      field.instance().value = val;
      field.simulate('change');
    }
    form.simulate('submit');
  });

  afterEach(() => {
      jest.clearAllMocks();
      store.clearActions();
  });

  it('submits the expected API query', () => {
    const {api_key, api_url} = config.ownup;
    expect(Axios.get).toHaveBeenCalledWith(
      api_url,
      {
        headers: {
          authorization: `OU-AUTH ${api_key}`,
        },
        params: formData,
      },
    );
  });

  it('stores the API response in state', () => {
    const start_action = redux_actions.quoteUpdateStart();

    const update_action =  redux_actions.updateQuotes(
      ownUpReturnData.rateQuotes
    );
    // Just to protect against something going wrong
    // with the action factory - should probably go
    // in a separate test file for redux
    expect(update_action).toHaveProperty('type');
    expect(update_action).toHaveProperty('payload');
    expect(update_action.payload).toHaveLength(ownUpReturnData.rateQuotes.length);

    const finish_action = redux_actions.quoteUpdateFinish();
    
    const expected_actions = [
      start_action,
      update_action,
      finish_action,
    ]

    const actions = store.getActions();
    expect(actions).toEqual(expected_actions);
  });
});