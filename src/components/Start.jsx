import React from "react"; // Import React


const Start = (props) => {
  return (
    <>
      <div className="first-page-container"> {/* Container for the start page */}
        <h1 className="title">Quizzical</h1> {/* Title of the quiz */}
        {/* Display error message if loadingError prop is passed */}
        <p style={{
          color: 'red', // Error message styled in red
        }}>{props.loadingError}</p>
        <p>some desc if needed</p> {/* Placeholder for additional description */}
        {/* Button to start the quiz, calls onStart prop function */}
        <button onClick={props.onStart} className="primary-btn">Start Quiz</button>
      </div>
    </>
  );
};

export default Start; // Export Start component
