import React from 'react';
import Trivia_api from '../api/Trivia_api';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: "medium",
            selectedCategory: "",
            categories: [],
            result: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        this.getCategories();
    };

    async getCategories() {
        const response = await Trivia_api.get('/api_category.php');
        this.setState({
            categories: response.data.trivia_categories, selectedCategory: response.data.trivia_categories[0].name
        });
    };

    handleOptionChange = changeEvent => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    handleCategoryChange = changeEvent => {
        this.setState({
            selectedCategory: changeEvent.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        this.state.result.push(this.state.selectedOption);
        this.state.result.push(this.state.selectedCategory);

        this.props.onSubmit(this.state.result);
    };

    render () {
        return (
            <div className='container'>
                <div className='row'><h1>Categories</h1></div>
                <form onSubmit={this.handleSubmit}>
                    <div className='difficultyOptions'>
                        <label><input type="radio" value="easy" checked={this.state.selectedOption === "easy"} onChange={this.handleOptionChange}/>Easy</label>
                        <label><input type="radio" value="medium" checked={this.state.selectedOption === "medium"} onChange={this.handleOptionChange}/>Medium</label>
                        <label><input type="radio" value="hard" checked={this.state.selectedOption === "hard"} onChange={this.handleOptionChange}/>Hard</label>
                    </div>

                    <div className='categoriesList'>
                        <label>
                            Choose your category:
                            <select 
                                value={this.state.selectedCategory} 
                                onChange={this.handleCategoryChange}>
                                    {this.state.categories.map((topic) => <option value={topic.name} key={topic.id}> {topic.name} </option>)}
                            </select>
                        </label>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Menu;