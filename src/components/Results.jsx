import React from 'react';
import hands_up from '../hands_up.png';
import hands_down from '../hands_down.png';

function Results(props) {
  const myGroupResults = props.data;
  const userAnswers = props.answers;

  const showImage = (selectedAnswer, correctAnswer) => {
    let image = '';
    if(selectedAnswer === correctAnswer){
        image =  <img src={hands_up} alt="Correct Answer" />
    } else {
        image =  <img src={hands_down} alt="Inorrect Answer" />
    }
    return image;
  };

  return (
    <div>
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
        { myGroupResults.map((data, index) =>
            <tr key={"section-" + index}>
                <td key={index}>Q{index + 1}: {data.question}</td>
                <td key={"your_ans" + index}>{userAnswers[index]}</td>
                <td key={"image" + index}>{showImage(userAnswers[index], data.correct_answer)}</td>
                <td key={"answer" + index}>{data.correct_answer}</td>
            </tr>
        )}
        </tbody>
      </table>
    </div>
  )
};

export default Results;
