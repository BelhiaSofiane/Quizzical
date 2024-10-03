import Start from "./components/Start"; // Import Start component
import Loading from "./components/Loading"; // Import Loading component
import "./index.css"; // Import CSS styles
import { useState, useEffect } from "react"; // Import useState and useEffect hooks
import { nanoid } from "nanoid"; // Import nanoid for unique IDs
import Questions from "./components/Questions";
import { selectClasses } from "@mui/material";

function App() {
  // State management
  const [started, setStarted] = useState(false); // Tracks if quiz has started
  const [loading ,setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state
  const [apiData, setApiData] = useState([]); // Stores questions fetched from API
  const [count, setCount] = useState(0)
  const [finishedGame ,setFinishedGame] = useState(false)
  
  // Function to fetch data from the API
  const callApi = async () => {
    setLoading(true); // Set loading to true to show loading screen
    setError(null); // Clear previous errors
    try {
      // Fetch questions from Open Trivia DB API
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple&encode=base64",
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json(); // Parse API response
        let q = [] // Array to store processed questions 
        // Loop through each question in the API response
        data.results.forEach(question => {
          q.push({
            id: nanoid(), 
            answers: shuffleArr([...question.incorrect_answers ,question.correct_answer]), // Shuffle answers
            correct: question.correct_answer, 
            question: question.question, 
            selectedAnswer: null,
            checked:false, 
          });
          setApiData(q); // Set the processed questions into state
        });
        setStarted(true); // Mark quiz as started to load questions page
      } 
    } catch (e) {
      // If error occurs, log it and set error state
      console.log("error found", e);
      setError('Error, Start the quiz again');
    } finally {
      setLoading(false); // Set loading to false once API call completes
    }
  };

  // Function to shuffle array elements (Fisher-Yates algorithm)
  function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    } 
    return arr;
  }

  // Function to handle starting the quiz
  function handleStart() {
    callApi(); // Call API when quiz is started
  }

function handleClickAnswer(questionId, answer) {
  setApiData(prevData =>
    prevData.map(question => {
      if (question.id === questionId) {
        // Check if the selected answer is correct and update count accordingly
        return { ...question, selectedAnswer: answer };
      }
      return question;
    })
  );
}






function handleCheckAnswers() {
  setApiData(prevQuestions => {
    let correct = 0;
    
    const updatedQuestions = prevQuestions.map(question => {
      // Check if the selected answer is correct
      if (question.correct === question.selectedAnswer) {
        correct += 1; // Increment correct count if answer is correct
      }
      
      // Set `checked` to true for all questions
      return {
        ...question,
        checked: true, 
      };
    });

    // Update the correct answer count after mapping through the questions
    setCount(correct);

    return updatedQuestions; // Return the updated questions
  });
   setFinishedGame(true)
}


  function handleResetGame() {
    setCount(0)
    setApiData([])
    callApi()
    setFinishedGame(false)
  }

  function handleStartMenu(){
    setStarted(false)
    setCount(0)
    setApiData([])
    setFinishedGame(false)
  }

  // Conditionally render different pages based on state (loading, started, or error)
  let pages = loading 
    ? <Loading /> // Show loading screen if loading is true
    : started 
      ? (<Questions 
        qna={apiData}
        handleClickAnswer={handleClickAnswer}
        handleCheckAnswers={handleCheckAnswers}
        handleResetGame={handleResetGame}
        handleStartMenu={handleStartMenu}
        count={count}
        finishedGame={finishedGame}
        />)
      // ? (<Questions handleClickAnswer={handleClickAnswer} questions={questions}/>) // Show questions if quiz has started
      : (<Start loadingError={error} onStart={handleStart}/>); // Show start page or error if quiz hasn't started yet

  // Render the selected page
  return <>{pages}</>;
}

export default App; // Export App component
