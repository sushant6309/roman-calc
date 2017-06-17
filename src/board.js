/**
 * Created by apple on 17/06/17.
 */
import React from 'react';
import CalcButton from './button';
/**
 *
 * Calculators Buttons Board.
 *
 */
export default class Board extends React.Component {
  /**
   *
   * @param i
   * @param className
   *
   * This functions return button with Roman Character.
   */
  renderRoman(i, className) {
    return React.createElement(CalcButton, {
      value: i,
      classname: className,
      onClick: () => this.props.roman(i)
    });
  }

  /**
   *
   * @param i
   * @param className
   *
   * This functions return button with Operator Character.
   */
  renderOperator(i, className) {
    return React.createElement(CalcButton, {
      value: i,
      classname: className,
      onClick: () => this.props.operator(i)
    });
  }

  /**
   *
   * @param i
   * @param className
   *
   * This functions return button with Delete (Del)Character.
   */
  renderDelete(i, className) {
    return React.createElement(CalcButton, {
      value: i,
      classname: className,
      onClick: () => this.props.delete()
    });
  }

  /**
   *
   * @param i
   * @param className
   *
   * This functions return button with Equal to (=)Character.
   */
  renderEqualTo(i, className) {
    return React.createElement(CalcButton, {
      value: i,
      classname: className,
      onClick: () => this.props.equalTo()
    });
  }

  /**
   *
   * @param i
   * @param className
   *
   * This functions return button with Clear All (Clr) Character.
   */
  renderClearAll(i, className) {
    return React.createElement(CalcButton, {
      value: i,
      classname: className,
      onClick: () => this.props.clearAll()
    });
  }

  render() {
    return (
      <div>
        <div className="calculator-container">
          {this.renderOperator('/', 'block-1')}
          {this.renderOperator('*', 'block-1')}
          {this.renderOperator('-', 'block-1')}
          {this.renderOperator('+', 'block-1')}
        </div>
        <div className="calculator-container">
          {this.renderRoman('C', 'block-2')}
          {this.renderRoman('D', 'block-2')}
          {this.renderRoman('M', 'block-2')}
          {this.renderClearAll('Clr', 'block-1')}
        </div>

        <div className="calculator-container-4">
          {this.renderRoman('I', 'block-2')}
          {this.renderRoman('V', 'block-2')}
          {this.renderRoman('X', 'block-2')}
          {this.renderRoman('L', 'block-2')}
        </div>

        <div className="calculator-container-4">
          {this.renderDelete('Del', 'delete')}
          {this.renderEqualTo('=', 'delete-2')}
        </div>
      </div>
    );
  }
}