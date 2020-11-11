import Axios from 'axios';
import React from 'react';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from 'react-test-renderer';
import PropertySearcherForm from './PropertySearcherForm.js';
import config from './config.js';

jest.mock('axios');
Enzyme.configure({adapter: new Adapter() });

it('renders correctly (matches snapshot)', () => {
  const tree = renderer
    .create(<PropertySearcherForm/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe('PropertySearcherForm API interactions', () => {

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
    wrapper = Enzyme.mount(Enzyme.mount(<PropertySearcherForm />).get(0))
    Axios.get.mockResolvedValue(ownUpReturnData);
  });

  afterEach(() => {
      jest.clearAllMocks();
  });

  it('submits the expected API query', () => {
    const form = wrapper.find('form').first();
    const fields = {
      loanSize: "100000",
      propertyType: "Townhouse",
      creditScore: "600",
      occupancy: "Investment",
    }

    for ( let fieldName in fields ) {
      const val = fields[fieldName];
      const field = form.find('#' + fieldName).first();
      field.instance().value = val;
      field.simulate('change');
    }
    form.simulate('submit');

    const {api_key, api_url} = config.ownup;
    expect(Axios.get).toHaveBeenCalledWith(
      api_url,
      {
        headers: {
          authorization: `OU-AUTH ${api_key}`,
        },
        params: fields,
      },
    );
  });

  // it('stores the API response in state', () => {
  //   Axios.get.returnValue(Promise.resolve({
  //     "rateQuotes": [
  //       {
  //         "lenderName": "TFB Federal Credit Union",
  //         "loanType": "7/1 ARM",
  //         "interestRate": 3.5,
  //         "closingCosts": 2000,
  //         "monthlyPayment": 449.0446878088235,
  //         "apr": 3.660036729314016
  //       },
  //     ]
  //   }));
  // });
});