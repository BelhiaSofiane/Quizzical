import React from "react"; // Import React

const Start = (props) => {
  return (
    <div className="first-page-container">
      <h1 className="title">Quizzical</h1>

      {/* Display error message if loadingError exists */}
      {props.loadingError && (
        <p style={{ color: 'red' }}>{props.loadingError}</p>
      )}

      <p>some desc if needed</p> {/* Placeholder for additional description */}

      {/* Render the button based on the loadingError state */}
      <button onClick={props.onStart} className="primary-btn">
        {props.loadingError ? 'Retry' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default Start; // Export Start component
