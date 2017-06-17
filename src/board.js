/**
 * Created by apple on 17/06/17.
 */
import React from 'react';
import Square from './square';

export default class Board extends React.Component {
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
          {this.renderSquare('+', 'block-1')}
        </div>
        <div className="calculator-container">
          {this.renderSquare('C', 'block-2')}
          {this.renderSquare('D', 'block-2')}
          {this.renderSquare('M', 'block-2')}
          {this.renderSquare('Clr', 'block-1')}
        </div>

        <div className="calculator-container-4">
          {this.renderSquare('I', 'block-2')}
          {this.renderSquare('V', 'block-2')}
          {this.renderSquare('X', 'block-2')}
          {this.renderSquare('L', 'block-2')}
        </div>

        <div className="calculator-container-4">
          {this.renderSquare('Del', 'delete')}
          {this.renderSquare('=', 'delete-2')}
        </div>
      </div>
    );
  }
}