import React, { FunctionComponent } from 'react';
import './index.css';

interface Props {
  displayNumber: number;
  isDone: boolean;
}

export const NumberTile: FunctionComponent<Props> = (props) => {
  return (
    <span className={`tile${props.isDone ? " done" : ""}`}>{props.displayNumber}</span>
  );
}