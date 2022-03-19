import React from "react";
import { nanoid } from "nanoid";
import Option from "./Option";

export default function Questions(props) {
  const [submission, setSubmission] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    setArticles(getArticles());
  }, [props.quizs]);

  function messOrder(...arr) {
    const result = [];
    const list = arr.flat();
    while (list.length) {
      const select = Math.floor(Math.random() * 2) ? list.pop() : list.shift();
      result.push({
        option: select,
        picked: false,
      });
    }
    return result;
  }

  function getArticles() {
    const elements = props.quizs.map((quiz) => {
      const title = quiz.question;
      const answer = quiz.correct_answer;
      let options;
      if (quiz.type === "boolean") {
        options = [
          { option: "True", picked: false },
          { option: "False", picked: false },
        ];
      } else {
        options = messOrder(quiz.correct_answer, quiz.incorrect_answers);
      }

      return {
        id: nanoid(),
        title: title,
        answer: answer,
        options: options,
      };
    });
    return elements;
  }

  function checkAnswer(e) {
    e.preventDefault();
    if (e.target.textContent === "Play again") {
      setSubmission(false);
      props.setStarted(false);
    }
    setSubmission(true);
    articles.forEach((article) => {
      if (
        article.options.find((item) => item.picked).option === article.answer
      ) {
        setScore((prevScore) => prevScore + 1);
      }
    });
  }
  const articleElements = articles.map((article) => {
    const lists = article.options.map((item) => (
      <Option
        key={item.option}
        articleId={article.id}
        listItem={item}
        isSubmitted={submission}
        answer={article.answer}
        setArticles={setArticles}
      />
    ));
    return (
      <article key={article.id} className="question">
        <h2>{article.title}</h2>
        <ul className="options">{lists}</ul>
      </article>
    );
  });

  return (
    <form className="questions-form">
      {articleElements}
      <div className="questions--result">
        {submission && <span>You scored {score}/5 correct answers</span>}
        <button className="submit" onClick={(e) => checkAnswer(e)}>
          {submission ? "Play again" : "Check answers"}
        </button>
      </div>
    </form>
  );
}
