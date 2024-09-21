import React from "react";

const Start = (props) => {
  return (
    <>
      <div className="first-page-container">
        <h1>Quizzical</h1>
        <p>some desc if needed</p>
        <button onClick={props.onStart} className="primary-btn">Start Quiz</button>
      </div>
    </>
  );
};

export default Start;
