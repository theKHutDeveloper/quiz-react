import React from 'react';

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: "medium",
            selectedCategory: "",
            categories: [],
            result: []
        }
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