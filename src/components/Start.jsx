import React from "react"; // Import React

const Start = (props) => {
  return (
    <div className="first-page-container"> {/* Container for the start page */}
      <h1 className="title">Quizzical</h1> {/* Title of the quiz */}

      {/* Conditionally display the error message if loadingError exists */}
      {props.loadingError && (
        <p style={{ color: 'red' }}>{props.loadingError}</p> 
      )}

      <p>some desc if needed</p> {/* Placeholder for additional description */}

      {/* Conditionally display the Retry button if there's an error, otherwise show Start Quiz */}
      {props.loadingError ? (
        <button onClick={props.onStart} className="primary-btn">Retry</button>
      ) : (
        <button onClick={props.onStart} className="primary-btn">Start Quiz</button>
      )}
    </div>
  );
};

export default Start; // Export Start component
