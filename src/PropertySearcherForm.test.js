import React from 'react';
import renderer from 'react-test-renderer';
import PropertySearcherForm from './PropertySearcherForm.js';

it('renders correctly (matches snapshot)', () => {
  const tree = renderer
    .create(<PropertySearcherForm/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});