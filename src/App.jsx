import Start from "./components/Start"; 
import Loading from "./components/Loading"; 
import "./index.css"; 
import { useState } from "react"; 
import { nanoid } from "nanoid"; 
import Questions from "./components/Questions";

function App() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [count, setCount] = useState(0);
  const [finishedGame, setFinishedGame] = useState(false);

  // Helper function to reset states
  const resetState = () => {
    setApiData([]);
    setCount(0);
    setFinishedGame(false);
  };

  // Fetch questions from the API
  const callApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple&encode=base64"
      );
      if (!response.ok) throw new Error("Failed to fetch data from the API.");
      const data = await response.json();
      const formattedQuestions = data.results.map(question => ({
        id: nanoid(),
        answers: shuffleArr([...question.incorrect_answers, question.correct_answer]),
        correct: question.correct_answer,
        question: question.question,
        selectedAnswer: null,
        checked: false,
      }));
      setApiData(formattedQuestions);
      setStarted(true);
      return true;
    } catch (e) {
      setError('Error, replaying too fast! Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Shuffle array elements
  const shuffleArr = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Start the quiz by calling API
  const handleStart = () => callApi();

  // Handle answer selection
  const handleClickAnswer = (questionId, answer) => {
    setApiData(prevData =>
      prevData.map(question =>
        question.id === questionId ? { ...question, selectedAnswer: answer } : question
      )
    );
  };

  // Check answers and update score
  const handleCheckAnswers = () => {
    setApiData(prevQuestions => {
      let correct = 0;
      const updatedQuestions = prevQuestions.map(question => {
        if (question.correct === question.selectedAnswer) correct += 1;
        return { ...question, checked: true };
      });
      setCount(correct);
      setFinishedGame(true);
      return updatedQuestions;
    });
  };

  // Reset the game
  const handleResetGame = async () => {
    resetState();
    const success = await callApi();
    if (!success) setFinishedGame(false);
  };

  // Go back to start menu
  const handleStartMenu = () => {
    resetState();
    setStarted(false);
  };

  // Render pages based on state
  const renderPage = () => {
    if (loading) return <Loading />;
    if (error) return <Start loadingError={error} onStart={handleStart} />;
    if (started) {
      return (
        <Questions
          qna={apiData}
          handleClickAnswer={handleClickAnswer}
          handleCheckAnswers={handleCheckAnswers}
          handleResetGame={handleResetGame}
          handleStartMenu={handleStartMenu}
          count={count}
          finishedGame={finishedGame}
        />
      );
    }
    return <Start onStart={handleStart} />;
  };

  return <>{renderPage()}</>;
}

export default App;
