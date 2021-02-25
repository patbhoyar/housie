import React, { FunctionComponent } from 'react';
import './index.css';

interface Props {
  displayNumber: number;
  isDone: boolean;
  isCurrentNumber: boolean;
}

export const NumberTile: FunctionComponent<Props> = (props) => {
  return (
    <span className={`tile${props.isDone ? " done" : ""}${props.isCurrentNumber ? " current" : ""}`}>{props.displayNumber}</span>
  );
}