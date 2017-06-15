/**
 * Created by apple on 15/06/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';

function Square(props) {
  return React.createElement(
    "button",
    { className: props.classname, onClick: props.onClick },
    props.value
  );
}

class Board extends React.Component {
  renderSquare(i, className) {
    return React.createElement(Square, {
      value: i,
      classname: className,
      onClick: () => this.props.onClick(i)
    });
  }

  render() {
    return (
      <div>
        <div className="calculator-container">
          {this.renderSquare('/', 'block-1')}
          {this.renderSquare('*', 'block-1')}
          {this.renderSquare('-', 'block-1')}
        </div>
        <div className="calculator-container">
          {this.renderSquare('C', 'block-1')}
          {this.renderSquare('D', 'block-1')}
          {this.renderSquare('M', 'block-1')}
        </div>

        <div className="calculator-container-4">
          {this.renderSquare('I', 'block-1')}
          {this.renderSquare('V', 'block-1')}
          {this.renderSquare('X', 'block-1')}
          {this.renderSquare('L', 'block-1')}
        </div>

        <div className="calculator-container-4">
          {this.renderSquare('Del', 'delete')}
          {this.renderSquare('=', 'delete')}
        </div>
        <div className="main-container2">
          {this.renderSquare('+', 'block-sign')}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
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

  handleClick(i) {

    this.setState({ errorMessage:'' });
    if(_.indexOf(this.state.romans, i) >= 0) {
      this.addRomanToQueryString(i);
    }
    else if(_.indexOf(this.state.operands, i) >= 0) {
      this.addOperatorToQueryString(i);
    }
    else if(i === 'Del') {
      this.deleteFromQueryString();
    }
    else {
      this.calculateAnswer();
    }
  }

  addRomanToQueryString(roman) {
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

  addOperatorToQueryString(operator) {

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

  deleteFromQueryString() {

    if(this.state.queryString.length > 0){
      this.setState({ queryString: this.state.queryString.slice(0, -1) });
    }
    return true;
  }

  calculateAnswer() {
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

  giveResult(num) {
    if(num === 0) {
      this.setState({ result: 0 });
      return true;
    }

    if(num < 0){
      this.setState({ result: '-'+this.convertIntegerToRoman(num*-1) });
      return true;
    }

    this.setState({ result: this.convertIntegerToRoman(num) });
    return true;
  }

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
        <div className="text-display">
          {this.state.queryString}
        </div>
        <br/>
        <div>
          Error: {this.state.errorMessage}
        </div>
        <div>
          Result : {this.state.result}
        </div>
        <div className="main-container1">
          <Board
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
