import { Button } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { NumberTile } from './number-tile';

const App: FunctionComponent<{}> = (props) => {

  const TOTAL_NUMBERS = 90;
  const rules = ['First Line', 'Second Line', 'Third Line', 'BP', 'Full House'];
  const allNumbers = Array.from(Array(TOTAL_NUMBERS).keys()).map((i: number) => i + 1);
  const [doneNumbers, setDoneNumbers] = useState<number[]>([]);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>(allNumbers);
  const [generatedNumber, setGeneratedNumber] = useState<number>(0);
  const [lastNumber, setLastNumber] = useState<number>(0);
  const [selectedRules, setList] = useState<Array<boolean>>(Array(rules.length).fill(true));
  const [appliedRules, setRules] = useState<Array<string>>(rules);
  let availableNumbers = Array.from(Array(TOTAL_NUMBERS).keys()).map((i: number) => i + 1);

  const displayTiles = allNumbers.map((i: number) => {
    return (
      <>
        <NumberTile displayNumber={i} isDone={doneNumbers.includes(i)} isCurrentNumber={i === generatedNumber}></NumberTile>
        { i % 10 === 0 ? <br /> : null}
      </>
    )
  });

  const generateNumber = () => {
    const index = Math.floor(Math.random() * remainingNumbers.length);
    setLastNumber(generatedNumber)
    if (index <= remainingNumbers.length) {
      const newNumber = remainingNumbers[index];
      setGeneratedNumber(newNumber);
      availableNumbers = [...remainingNumbers];
      availableNumbers.splice(index, 1);
      setRemainingNumbers(availableNumbers);
      setDoneNumbers([...doneNumbers, newNumber]);
    }
  }

  const onCheck = (e: any, index: number) => {
    const x = [...selectedRules];
    x[index] = e.target.checked;
    setList(x);
    const a: string[] = [];
    x.forEach((isSelected: boolean, i: number) => {
      if (isSelected) {
        a.push(rules[i]);
      }
    });
    setRules(a)
  }

  const displayRules = rules.map((rule: string, index: number) => {
    const forCheck = rule.split(" ").join("_");
    return (
      <span>
        <input type="checkbox" id={forCheck} name={forCheck} onChange={(e) => onCheck(e, index)} checked={selectedRules[index]} />
        <label htmlFor={forCheck}>{rule}</label>
        <br />
      </span>
    );
  });

  const renderRules = () => appliedRules.map((rule: string) => {
    return (<li>{rule}</li>)
  });

  return (
    <div className="App">
      <div id="header">
        <div className='generatedNumberContainer'>
          <Button variant="contained" color="primary" onClick={generateNumber} disabled={remainingNumbers.length === 0} >Generate</Button>
          <div className='generatedNumber'>{generatedNumber}</div>
        </div>
        <div className='lastNumberContainer'>
          <div className="lastNumber">Last Number</div>
          <div className='lastNumberDisplay'>{lastNumber}</div>
        </div>
        <div id="displayRules">
          {displayRules}
        </div>
        <div id="notes">
          <textarea rows={9} cols={50}></textarea>
        </div>
      </div>
      <div id="tileContainer">
        {displayTiles}
      </div>
      <div id="ruleContainer">
        <div id="remainingTitle"><u>Remaining Plays</u></div>
        {renderRules()}
      </div>
    </div>
  );
}

export default App;