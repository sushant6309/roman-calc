/**
 * Created by apple on 17/06/17.
 */
import React from 'react';
/**
 *
 * @param props
 *
 * Calculator Buttons.
 *
 * @constructor
 */
export default function CalcButton(props) {
  return React.createElement(
    "button",
    { className: props.classname, onClick: props.onClick },
    props.value
  );
}