import React, { Component } from 'react';
import './App.css';
import './components/torontoWasteLookup.js';
import TorontoWasteLookup from './components/torontoWasteLookup.js';


class App extends Component {
  render() {
    return (
      <TorontoWasteLookup></TorontoWasteLookup>
    );
  }
}

export default App;
