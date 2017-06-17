/**
 * Created by apple on 17/06/17.
 */
import React from 'react';

export default function Square(props) {
  return React.createElement(
    "button",
    { className: props.classname, onClick: props.onClick },
    props.value
  );
}