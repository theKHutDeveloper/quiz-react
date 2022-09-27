import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Questions from './components/Questions';

export default function App (props) {

  const [categoryChosen, setCategoryChosen] = useState(false)
  const [results, setResults] = useState([])

  const onCategorySubmit = (questionData) => {
    setCategoryChosen(true)
    setResults( questionData)
  };

  const showInitialComponents = () => {
    return(
      <div className="App">
      <Header/>
      <Menu onSubmit={onCategorySubmit}/>
    </div>
    )
  }

  const showQuestions = () => {
    return (
      <div className="App">
        <Header/>
        <Questions results={results} />
      </div>
    )
  }

  const someFunction = () => {
    let hasChosenCategory = categoryChosen;
    let content;

    if (hasChosenCategory) {
      content = showQuestions();
    } else {
      content = showInitialComponents();
    }

    return <div>{content}</div>
  }

  return (someFunction())
}
