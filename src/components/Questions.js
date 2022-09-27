import React from 'react';
import { decode } from 'html-entities';
import hands_up from '../hands_up.png';
import hands_down from '../hands_down.png';
import '../App.css';

class Questions extends React.Component {
    constructor(props) {
        super(props);

        const group_results = this.groupQuestions(props.results)
        const radio_selects = group_results.map(question => question.possible_answers[0])

        this.state = {
            results: props.results,
            category: props.results[0].category,
            level: props.results[0].difficulty,
            size: props.results.length,
            counter: 1,
            question_data: group_results,
            selectedAnswer: radio_selects[0],
            selected_answers: radio_selects,
            answers: []
        };
        this.submitQuestion = this.submitQuestion.bind(this);
    };

    groupQuestions = question_set => {
        let question_list = question_set.map(this.questionObject)
        return question_list
    };

    groupSelection = question_set => {
        let selected_values = question_set.map(this.questionObject)
        return selected_values
    };

    questionObject = question => {
        return {
            question: decode(question.question),
            possible_answers: this.getAnswerOptions(this.decodeArray(question.incorrect_answers), decode(question.correct_answer)),
            correct_answer: decode(question.correct_answer),
        }
    }

    decodeArray = array => {
        return array.map((arr) => (
            decode(arr)
        ))
    };

    handleAnswerChange = changeEvent => {
        this.setState({
            selectedAnswer: changeEvent.target.value
        });
    };

    shuffleArray = array => {
        let i = 0;

        for (i = array.length - 1; i > 0; i -= 1) {
            let randomId = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[randomId];
            array[randomId] = temp;
        }
        return array;
    };

    getAnswerOptions = (incorrect_answers, correct_answer) => {
        let answers = []
        answers.push(correct_answer)
        answers.push(...incorrect_answers)
        let shuffled_answers = this.shuffleArray(answers);
        return shuffled_answers;
    };

    getMultipleChoice(possible_answers) {
        let formatted_answers =
            <div className='answerOptions'>
                { possible_answers.map((answer, index) => (
                    <p key={index}><label><input type="radio" value={answer} checked={this.state.selectedAnswer === answer} onChange={this.handleAnswerChange}/>{answer}</label></p>
                ))}
            </div>

        return formatted_answers;
    };

    showImage(selected_answer, correct_answer){
        let image = '';
        if(selected_answer === correct_answer){
            image =  <img src={hands_up} alt="Correct Answer" />
        } else {
            image =  <img src={hands_down} alt="Inorrect Answer" />
        }
        return image;
    }

    renderTable(){
        let results_table =
        <div className='results'>
            <br></br>
            <table className='table-results'>
                <thead>
                <tr>
                    <th>Questions</th>
                    <th>Your Answers</th>
                    <th>Results</th>
                    <th>Correct Answers</th>
                </tr>
                </thead>
                <tbody>
                { this.state.question_data.map((data, index) =>
                    <tr>
                        <td key={index}>Q{index + 1}: {data.question}</td>
                        <td key={"your_ans" + index}>{this.state.answers[index]}</td>
                        <td key={"image" + index}>{this.showImage(this.state.answers[index], data.correct_answer)}</td>
                        <td key={"answer" + index}>{data.correct_answer}</td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        return results_table;
    }

    submitQuestion = e => {
        this.setState({
            answers: [...this.state.answers, this.state.selectedAnswer],
            selectedAnswer: this.state.selected_answers[this.state.counter],
            counter: this.state.counter + 1
        })

        e.preventDefault();
        // if no more questions, show confirmation of right/wrong answers
    }

    render() {
        return (
            <div>
                <h1 className='category-title'>{this.state.category}</h1>
                <div className='difficulty-level'>Difficulty: {this.state.level}</div>

                {
                    this.state.size > 0 && this.state.counter <= this.state.size &&
                    <h2>
                        Question {this.state.counter} of {this.state.size}
                    </h2>
                }

                {
                    this.state.counter === 11 &&
                    <h2>
                        Let's see how you did?
                    </h2>
                }

                <form onSubmit={this.submitQuestion}>
                    <div>
                        { this.state.size > 0 && this.state.counter <= this.state.size &&
                            <p>
                                {this.state.question_data[this.state.counter - 1].question}
                            </p>
                        }
                    </div>

                    { this.state.size > 0 && this.state.counter <= this.state.size &&
                        <div>
                            { this.getMultipleChoice(
                                this.state.question_data[this.state.counter - 1].possible_answers)
                            }
                        </div>
                    }

                    {
                        this.state.counter === 11 &&
                            <div>
                                {this.renderTable()}
                            </div>
                    }

                    {
                        this.state.counter < 11 &&
                            <input type="submit" value={this.state.counter < this.state.size ? "Next" : "Get Results"}/>
                    }
                </form>
            </div>
        )
    };
}

export default Questions;