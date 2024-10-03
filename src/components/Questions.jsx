import React from "react";

const Questions = ({ 
  qna = [], 
  handleClickAnswer, 
  count, 
  handleCheckAnswers, 
  handleStartMenu, 
  handleResetGame, 
  finishedGame 
}) => {
  // Render each question and its possible answers
  const questionsElement = qna.map((question, index) => (
    <div key={index} className="question-container">
      {/* Display the question */}
      <h1 className="question-title">{atob(question.question)}</h1>

      {/* Display possible answers for each question */}
      <div className="answer-container">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleClickAnswer(question.id, answer)}
            className={`
              ${question.checked 
                ? answer === question.correct 
                  ? 'correct' 
                  : question.selectedAnswer === answer 
                    ? 'incorrect' 
                    : '' 
                : question.selectedAnswer === answer 
                  ? 'selected' 
                  : 'not-selected'}`}
          >
            {atob(answer)}
          </button>
        ))}
      </div>
      <br />
    </div>
  ));

  // Elements to reset or replay the game
  const resetGameElement = (
    <div className="reset-container df">
      <button className="primary-btn" onClick={handleStartMenu}>Start Menu</button>
      <button className="primary-btn" onClick={handleResetGame}>Replay the Game</button>
    </div>
  );

  return (
    <>
      <div className="quizz-container">
        {questionsElement}

        {/* Show "Check Answers" or reset buttons based on game state */}
        {finishedGame ? resetGameElement : (
          <button className="primary-btn" onClick={handleCheckAnswers}>
            Check Answers
          </button>
        )}

        {/* Display the score if count is greater than 0 */}
        {count > 0 && (
          <span className="df">
            You Have Scored {count}/5
          </span>
        )}
      </div>
    </>
  );
};

export default Questions;
