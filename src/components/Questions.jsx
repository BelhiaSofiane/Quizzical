import React from "react";

const Questions = ({ qna = [], handleClickAnswer, count, handleCheckAnswers, handleStartMenu, handleResetGame, finishedGame }) => {
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
                  :'not-selected'}`
            }
          >
            {atob(answer)}
          </button>
        ))}
      </div>
      <br/>
    </div>
  ));

  const resetGameElement = 
  <div className="reset-container">
    <button className="primary-btn" onClick={() => handleStartMenu()}>Start Menu</button>
    <button className="primary-btn" onClick={() => handleResetGame()}>Replay the Game</button>
  </div>

  return (
    <>
      <div className="quizz-container">
        {questionsElement}
        {finishedGame 
          ?  resetGameElement
          :<button className="primary-btn" onClick={() => handleCheckAnswers()}>Check Answers</button>}
        <div onClick={() => console.log(count)}>You Have Scored {count}/5</div>
      </div>
    </>
  );
};

export default Questions;
