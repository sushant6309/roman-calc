/**
 * Created by apple on 17/06/17.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Calculator from './calculator'

test('Testing Roman Calculator', () => {

  const rendered = renderer.create(<Calculator />).toJSON();
  expect(rendered).toBeTruthy();

});