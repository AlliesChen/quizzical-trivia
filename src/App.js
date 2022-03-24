import React from "react";
import Questions from "./Components/Questions";
import "./App.css";

export default function App() {
  const [started, setStarted] = React.useState(false);
  const [quizs, setQuizs] = React.useState([]);

  React.useEffect(() => {
    async function getQuizs() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9"
      );
      const data = await res.json();
      const { results } = await data;
      setQuizs(results);
    }
    if (started) {
      getQuizs();
    }
  }, [started]);
  return (
    <main className="app-container">
      {!started && (
        <div className="start-container">
          <h1>Quizzical</h1>
          <p>
            Get five questions and have fun to expand your knowledge for trivia!
          </p>
          <button onClick={() => setStarted(true)}>Start quiz</button>
        </div>
      )}
      {started && (
        <Questions isStarted={started} setStarted={setStarted} quizs={quizs} />
      )}
    </main>
  );
}
