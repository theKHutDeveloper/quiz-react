import React from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Menu />
      </div>
    )
  }
}

export default App;
