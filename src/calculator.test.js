/**
 * Created by apple on 17/06/17.
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Square from './square';
import Board from './board';
import Calculator from './calculator'
import { mount } from 'enzyme';

test('Testing Roman Calculator', () => {

  const calculator = mount(<Calculator/>);
  //calculator.handleClick('V');
  console.log(calculator);

});