import React from "react";

const Questions = ({ qna = [], handleClickAnswer, count, handleCheckAnswers }) => {
  const questionsElement = qna.map((question, index) => (
    <div key={index} className="question-container">
      {/* Decode and display the question */}
      <h1 className="question-title">{atob(question.question)}</h1>

      {/* Map through the answers for each question */}
      <div className="answer-container">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleClickAnswer(question.id, answer)}
            className={
              `${question.checked 
                ? answer === question.correct 
                  ?'correct'
                  :question.selectedAnswer === answer 
                    ?'incorrect'
                    :''
                : question.selectedAnswer === answer 
                  ?'selected'
                  :'not-selected'} `
            }
          >
            {atob(answer)}
          </button>
        ))}
      </div>
      <br/>
    </div>
  ));

  return (
    <>
      <div className="quizz-container">
        {questionsElement}
        <button className="primary-btn" onClick={() => handleCheckAnswers()}>Check Answers</button>
      </div>
    </>
  );
};

export default Questions;
