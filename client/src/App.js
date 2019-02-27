import React, { Component } from 'react';
import './App.css';
import Provinces from './Provinces';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Aedes Zone</h1>
          <Provinces/>
        </header>
      </div>
    );
  }
}

export default App;
