import * as React from 'react';
import './App.css';

import { RollHub } from './Containers/RollHub/RollHub';

import logo from './logo.svg';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The React Dice Roller</h1>
        </header>
        <RollHub />
      </div>
    );
  }
}

export default App;
