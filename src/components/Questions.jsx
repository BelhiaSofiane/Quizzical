import React from "react";

const Questions = ({ qna = [], handleClickAnswer, count, handleCheckAnswers }) => {
  const questionsElement = qna.map((question, index) => (
    <div key={index}>
      {/* Decode and display the question */}
      <h1 className="question-title">{atob(question.question)}</h1>

      {/* Map through the answers for each question */}
      {question.answers.map((answer, i) => (
        <button
          key={i}
          onClick={() => handleClickAnswer(question.id, answer)}
          className={
            question.checked 
              ? answer === question.correct 
                ?'correct'
                :question.selectedAnswer === answer 
                  ?'incorrect'
                  :''
              : question.selectedAnswer === answer 
                ?'selected'
                : 'not-selected'
          }
        >
          {atob(answer)}
        </button>
      ))}
    </div>
  ));

  return (
    <>
      {questionsElement}
      <button onClick={() => handleCheckAnswers()}>Check Answers</button>
      {count = 0 ? <p>Hello </p> : <p>you have answered {count}/5 correctly </p>}
    </>
  );
};

export default Questions;
