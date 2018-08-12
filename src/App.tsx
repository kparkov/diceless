import * as React from 'react';
import './App.css';

import { RollHub } from './Containers/RollHub/RollHub';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dice Roller Toolkit</h1>
        </header>
        <RollHub />
      </div>
    );
  }
}

export default App;
