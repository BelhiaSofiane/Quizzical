import Questions from "./components/Questions";
import Start from "./components/Start";
import Loading from "./components/Loading";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [data, setData] = useState([]);
  const [loading ,setLoading] = useState(false)
  const [error, setError] = useState(null)

  const callApi = async () => {
    setLoading(true) // trigers loading screen
    setError(null) // clears prev errors
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple&encode=base64",
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setData(data.results);
        console.log("response Json", data);
        setStarted(true); // triggers Questions page
      } else {
        console.log(data.results);
      }
    } catch (e) {
      console.log("error found", e);
    } finally {
      setLoading(false)
    }
  };

  function handleStart() {
    callApi();
  }

  // let pages = started ? (
  //   <Questions data={data} />
  // ) : (
  //   <Start onStart={handleStart} />
  // );
  
  let pages = loading 
    ? <Loading /> 
    : started 
      ? (<Questions data={data}/>)
      : (<Start onStart={handleStart}/>)


  return <>{pages}</>;
}

export default App;
