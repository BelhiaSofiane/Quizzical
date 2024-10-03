import React from "react";

// Helper function to determine the class of each answer button
function getButtonClass(question, answer){
  if (question.checked) {
    if (answer === question.correct) return 'correct';
    if (answer === question.selectedAnswer) return 'incorrect';
    return '';
  }
  return answer === question.selectedAnswer ? 'selected' : 'not-selected';
};

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
  const questionsElement = qna.map((question) => (
    <div key={question.id} className="question-container">
      <h1 className="question-title">{atob(question.question)}</h1>
      <div className="answer-container">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleClickAnswer(question.id, answer)}
            className={getButtonClass(question, answer)}
          >
            {atob(answer)}
          </button>
        ))}
      </div>
      <br />
    </div>
  ));

  // Reset/replay buttons
  const resetGameElement = (
    <div className="reset-container df">
      <button className="primary-btn" onClick={handleStartMenu}>Start Menu</button>
      <button className="primary-btn" onClick={handleResetGame}>Replay the Game</button>
    </div>
  );

  return (
    <div className="quizz-container">
      {questionsElement}

      {/* Show "Check Answers" or reset buttons based on game state */}
      {finishedGame ? resetGameElement : (
        <button className="primary-btn" onClick={handleCheckAnswers}>
          Check Answers
        </button>
      )}

      {/* Display score if the game is finished */}
      {count > 0 && (
        <span className="df">
          You Have Scored {count}/5
        </span>
      )}
    </div>
  );
};

export default Questions;
