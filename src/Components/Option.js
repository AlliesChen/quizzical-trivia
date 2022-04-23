export default function Option(props) {
  const element = props.listItem;

  function getStyles() {
    let styles = {
      border: element.picked ? "none" : "1px solid #4d5b9e",
      backgroundColor: element.picked ? "#d6dbf5" : "transparent",
    };
    if (props.isSubmitted) {
      const isRightAnswer = element.option === props.answer;
      const bgColor = (() => {
        if (isRightAnswer) {
          return "#94D7A2";
        } else if (element.picked && !isRightAnswer) {
          return "#F8BCBC";
        }
        return "transparent";
      })();
      styles = {
        border: element.picked || isRightAnswer ? "none" : "1px solid #4d5b9e",
        backgroundColor: bgColor,
        opacity: isRightAnswer ? "100%" : "50%",
        cursor: "default",
      };
    }
    return styles;
  }

  function pickAnswer() {
    if (props.isSubmitted) return;
    props.setArticles((prevArticles) =>
      prevArticles.map((article) => {
        if (article.id === props.articleId) {
          const options = article.options.map((option) =>
            option.option === element.option
              ? { ...option, picked: true }
              : { ...option, picked: false }
          );
          return { ...article, options };
        }
        return { ...article };
      })
    );
  }

  return (
    <li
      key={element.option}
      onClick={pickAnswer}
      style={getStyles()}
      dangerouslySetInnerHTML={props.createMarkup(element.option)}
    />
  );
}
