import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import '../App.css';
import Results from './Results';

// TODO: Move Results into a separate component
function Questions(props) {
  const results = props.results;
  const category = results[0].category;
  const level = results[0].difficulty;
  const size = results.length;
  const [possibleAnswers, setPossibleAnswers] = useState("");
  const [myGroupResults, setMyGroupResults] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [counter, setCounter] = useState(1);
  const questionObject = question => {
    return {
      question: decode(question.question),
      possible_answers: getAnswerOptions(decodeArray(question.incorrect_answers), decode(question.correct_answer)),
      correct_answer: decode(question.correct_answer)
    }
  };

  useEffect(() => {
    const groupQuestions = questionSet => {
      return questionSet.map(questionObject);
    };

    let resultList = groupQuestions(results);

    const newData = resultList.map((object, index) => ({
      id: index,
      correct_answer: object.correct_answer,
      possible_answers: object.possible_answers,
      question: object.question,
    }));

    setMyGroupResults([...newData])
    setPossibleAnswers(resultList.map(question => question.possible_answers[0]));
    // eslint-disable-next-line
  }, []);


  const getAnswerOptions = (incorrectAnswers, correctAnswer) => {
    let answers = [];
    answers.push(correctAnswer);
    answers.push(...incorrectAnswers);
    let shuffledAnswers = shuffleArray(answers);
    return shuffledAnswers;
  };

  const decodeArray = array => {
    return array.map((arr) => (
        decode(arr)
    ));
  };

  const handleAnswerChange = changeEvent => {
    setSelectedAnswer(changeEvent.target.value);
  };

  const shuffleArray = array => {
    let i = 0;

    for (i = array.length - 1; i > 0; i -= 1) {
        let randomId = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[randomId];
        array[randomId] = temp;
    }
    return array;
  };

  const getMultipleChoice = (possibleAnswers) => {
    let formatted_answers =
        <div className='answerOptions'>
            { possibleAnswers.map((answer, index) => (
                <p
                  key={index}>
                    <label>
                      <input
                        type="radio"
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={handleAnswerChange}
                      />
                      {answer}
                    </label>
                </p>
            ))}
        </div>

    return formatted_answers;
  };

  const submitQuestion = e => {
    setUserAnswers([...userAnswers, selectedAnswer]);
    setSelectedAnswer(possibleAnswers[counter]);
    setCounter(counter +1);

    e.preventDefault();
  };

  return (
    <div>
      <h1 className='category-title'>{category}</h1>
      <div className='difficulty-level'>Difficulty: { level }</div>

      {
        size > 0 && counter <= size &&
        <h2>
            Question {counter} of {size}
        </h2>
      }

      {
        counter === 11 &&
        <h2>Let's see how you did?</h2>
      }

      { <form onSubmit={submitQuestion}>
        <div>
          { size > 0 && counter <= size && myGroupResults.length > 0 &&
              <div>
                <p>
                    {myGroupResults[counter - 1]?.question}
                </p>

                  { getMultipleChoice(
                    myGroupResults[counter - 1]?.possible_answers)
                  }
              </div>
          }
        </div>

        {
          counter === 11 &&
          <div>
            <Results data={myGroupResults} answers={userAnswers}/>
          </div>
        }

        {
          counter < 11 &&
          <input type="submit" value={counter < size ? "Next" : "Get Results"}/>
        }
      </form>
      }
    </div>
  );

};

export default Questions;
