import React from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Questions from './components/Questions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryChosen: false
    };

    this.onCategorySubmit = this.onCategorySubmit.bind(this);
  };

  onCategorySubmit(questionData) {
    this.setState({
      results: questionData,
      categoryChosen: true
    });
  };

  showInitialComponents() {
    return(
      <div className="App">
      <Header/>
      <Menu onSubmit={this.onCategorySubmit}/>
    </div>
    )
  }

  showQuestions() {
    return (
      <div className="App">
        <Header/>
        <Questions results={this.state.results} />
      </div>
    )
  }

  render() {
    let hasChosenCategory = this.state.categoryChosen;
    let content;

    if (hasChosenCategory) {
      content = this.showQuestions();
    } else {
      content = this.showInitialComponents();
    }

    return <div>{content}</div>
  }
}

export default App;
