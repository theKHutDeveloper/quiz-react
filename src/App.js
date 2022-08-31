import React from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';


class App extends React.Component {

  onCategorySubmit(categoryOptions) {
    console.log(categoryOptions);
  };

  render() {
    return (
      <div className="App">
        <Header/>
        <Menu onSubmit={this.onCategorySubmit}/>
      </div>
    )
  }
}

export default App;
