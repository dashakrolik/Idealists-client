import React, { Component } from 'react';
import './App.css';
import SignupContainer from './components/Signup/SignupContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SignupContainer />
        </header>
      </div>
    );
  }
}

export default App;
