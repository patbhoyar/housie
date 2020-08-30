import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { NumberTile } from './number-tile';

const App: FunctionComponent<{}> = (props) => {

  const TOTAL_NUMBERS = 90;
  const rules = ['First Line', 'Second Line', 'Third Line', 'BP', 'Full House'];
  const allNumbers = Array.from(Array(TOTAL_NUMBERS).keys()).map((i: number) => i+1);
  const [doneNumbers, setDoneNumbers] = useState<number[]>([]);
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>(allNumbers);
  const [generatedNumber, setGeneratedNumber] = useState<number>(0);
  const [lastNumber, setLastNumber] = useState<number>(0);
  let availableNumbers = Array.from(Array(TOTAL_NUMBERS).keys()).map((i: number) => i+1);

  const displayTiles = allNumbers.map((i: number) => {
    return (
      <>
        <NumberTile displayNumber={i} isDone={doneNumbers.includes(i)}></NumberTile>
        { i%10 === 0 ? <br /> : null }
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
      setRemainingNumbers(availableNumbers)
      setDoneNumbers([...doneNumbers, newNumber]);
    }
  }

  const displayRules = rules.map((rule: string) => {
    return (
      <span>
        <input type="checkbox" id={rule} name={rule}/>
        <label for={rule}>{rule}</label>
        <br/>
      </span>
    );
  });

  return (
    <div className="App">
      <div id="header">
        <div className='generatedNumberContainer'>
          <button onClick={generateNumber} disabled={remainingNumbers.length === 0} id="generateButton">Generate</button>
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
          <textarea rows="9" cols="50"></textarea>
        </div>
      </div>
      <div id="tileContainer">
        {displayTiles}
      </div>
    </div>
  );
}

export default App;