import React, { useState, useEffect } from 'react';
import Trivia_api from '../api/Trivia_api';

function Menu(props) {
  const [ categories, setCategories ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ selectedOption, setSelectedOption ] = useState("medium")

  useEffect(() => {
    const getCategories = async ()  =>  {
      const response = await Trivia_api.get('/api_category.php');
      const categoryList =  response.data.trivia_categories;
      const defaultCategory = response.data.trivia_categories[0].id;
      setCategories(categoryList);
      setSelectedCategory(defaultCategory);
    };

    getCategories();
  }, []);

  const getQuestions = async () => {
    const response = await Trivia_api.get('/api.php?amount=10&category='+ selectedCategory + '&difficulty='+ selectedOption)
    const data = await response.data
    const result = await data.results

    return result;
  };

  const handleOptionChange = changeEvent => {
    setSelectedOption(changeEvent.target.value);
  };

  const handleCategoryChange = changeEvent => {
    setSelectedCategory(changeEvent.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const values = await getQuestions();
    return props.onSubmit(values);
  }

  return (
    <div>
      <div className='container'>
        <div className='row'><h1>Categories</h1></div>
        <form onSubmit={handleSubmit}>
          <div className='difficultyOptions'>
            <label><input type="radio" value="easy" checked={selectedOption === "easy"} onChange={handleOptionChange}/>Easy</label>
            <label><input type="radio" value="medium" checked={selectedOption === "medium"} onChange={handleOptionChange}/>Medium</label>
            <label><input type="radio" value="hard" checked={selectedOption === "hard"} onChange={handleOptionChange}/>Hard</label>
          </div>
          <div className='categoriesList'>
            <label>
              Choose your category:
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}>
                    {categories.map((topic) => <option value={topic.id}  key={topic.id}> {topic.name} </option>)}
              </select>
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default Menu;
