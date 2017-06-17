/**
 * Created by apple on 16/06/17.
 */
/**
 * Created by apple on 15/06/17.
 */

import React from 'react';

import _ from 'lodash';
import './index.css';
import Board from './board';
/**
 * Parent Class
 *
 * This class contains all the logical components for the calculator.
 */
export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      queryString: '',
      romans: ['I', 'V', 'X', 'L', 'C', 'D', 'M'],
      operands: ['*', '/', '+', '-'],
      specialOperators: ['=', 'Del'],
      errorMessage: '',
      result : '',
    };
  }

  /**
   * Clear all @function
   *
   * To clear the calculator screen.
   */
  clearAll() {

      this.setState({
        queryString : '',
        result: '',
        errorMessage: '',
      });
  }

  /**
   *
   * @param roman
   *
   * This function inserts the Roman character to @calculator queryString.
   * Also check the validation for correct roman number.
   *
   * @returns {boolean}
   */
  addRomanToQueryString(roman) {
    this.setState({ errorMessage: '' });
    const qs = this.state.queryString;
    if(qs.length === 0) {
      this.setState({ queryString: qs+roman });
      return true;
    }

    if(qs[qs.length-1] === '+' || qs[qs.length-1] === '-' || qs[qs.length-1] === '/' || qs[qs.length-1] === '*') {
      this.setState({ queryString: qs+roman });
      return true;
    }

    const StringArr = qs.split(/[+-//*]+/);
    let lastString = StringArr[StringArr.length - 1];

    //Check with regular expression
    const pattern = new RegExp("^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$");
    const check = pattern.test(lastString+roman);
    if(check){
      this.setState({ queryString: qs+roman });
      return true;
    }
    this.setState({ errorMessage:'Not a Roman Number.' });
    return true;
  }

  /**
   *
   * @param operator
   *
   * This function adds a operator to the queryString
   * @returns {boolean}
   */
  addOperatorToQueryString(operator) {

    this.setState({ errorMessage: '' });

    if(this.state.queryString.length < 1){
      return true;
    }

    let qs = this.state.queryString;

    if(qs[qs.length-1] === '+' || qs[qs.length-1] === '-' || qs[qs.length-1] === '/' || qs[qs.length-1] === '*') {
      qs = qs.slice(0,-1);
      this.setState({ queryString: qs+operator });
      return true;
    }

    this.setState({ queryString: qs+operator });
  }

  /**
   * This function removes the last character from the queryString.
   * @returns {boolean}
   */
  deleteFromQueryString() {
    this.setState({ errorMessage: '' });
    if(this.state.queryString.length > 0){
      this.setState({ queryString: this.state.queryString.slice(0, -1) });
    }
    return true;
  }

  /**
   * This function calculates the results of the mathematical problem given by user
   */
  calculateAnswer() {
    this.setState({ errorMessage: '' });
    let qs = this.state.queryString;
    const romans = qs.split(/[+-//*]+/);
    const _this = this;
    const numbersToRoman = _.map(romans, (r) => {
      return _this.convertRomanToInteger(r);
    });

    while(numbersToRoman.length > 1){
      const operator = qs.search(/[+-//*]+/);
      numbersToRoman.splice(0, 2, this.calculate(numbersToRoman[0], numbersToRoman[1], qs[operator]));

      if(romans.length >= 2 ) {
        const lengthToRemove = romans[0].length+romans[1].length+1;
        qs = qs.slice(lengthToRemove, qs.length);
        romans.splice(0,2);
      }else {
        romans.splice(0,1);
      }
    }

    this.giveResult(Math.floor(numbersToRoman[0]));

  }

  /**
   *
   * @param num
   * This function display result on calculator screen.
   * @returns {boolean}
   */
  giveResult(num) {
    this.setState({ queryString: '' });
    if(num === 0) {
      this.setState({ result: 0 });
      return true;
    }

    if( num > 3999 || num < -3999 ) {
      this.setState({ result: 'e' });
      return true;
    }

    if(num < 0){
      this.setState({ result: '-'+this.convertIntegerToRoman(num*-1) });
      return true;
    }

    this.setState({ result: this.convertIntegerToRoman(num) });
    return true;
  }

  /**
   *
   * @param num1
   * @param num2
   * @param operator
   *
   * @returns {*}
   */
  calculate(num1, num2, operator){
    if(operator === '*'){
      return num1 * num2;
    }

    if(operator === '-'){
      return num1 - num2;
    }

    if(operator === '+') {
      return num1 + num2;
    }

    return num1 / num2;
  }

  /**
   *
   * @param roman
   *
   * This function converts Roman numbers to Integers.
   * @returns {number}
   */
  convertRomanToInteger(roman) {
    let result = 0;
    // the result is now a number, not a string
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const romanLiterals = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (let i = 0;i<=decimal.length;i++) {
      while (roman.indexOf(romanLiterals[i]) === 0){
        result += decimal[i];
        roman = roman.replace(romanLiterals[i],'');
      }
    }
    return result;
  }

  /**
   *
   * @param num
   *
   * This function converts Integers to Roman Numbers.
   *
   * @returns {string}
   */
  convertIntegerToRoman(num) {
    let result = '';
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
    for (let i = 0;i<=decimal.length;i++) {
      // looping over every element of our arrays
      while (num%decimal[i] < num) {
        // keep trying the same number until it won't fit anymore
        result += roman[i];
        // add the matching roman number to our result string
        num -= decimal[i];
        // remove the decimal value of the roman number from our number
      }
    }
    return result;
  }

  render() {


    return (
      <div className="container-display">
        {this.state.errorMessage !== ''  &&
        <div className="text-display" style={{marginLeft: 11, color: 'red'}}>{this.state.errorMessage}</div>
        }
        <div className="result-container">
          <div className="text-display">
            {this.state.queryString}
          </div>
          <div className="result-heading">{this.state.result}</div>
        </div>
        <div className="main-container1">
          <Board
            roman={i => this.addRomanToQueryString(i)}
            delete={() => this.deleteFromQueryString()}
            operator={i => this.addOperatorToQueryString(i)}
            equalTo={() => this.calculateAnswer()}
            clearAll={() => this.clearAll()}
          />
        </div>
      </div>
    );
  }
}