import { useState } from "react";

const Statistics = ({ feedback }) => {
  let { good, neutral, bad } = feedback;
  let all = good + neutral + bad;
  if (all !== 0) {
    let nonZeroSum = all === 0 ? 1 : all;
    let positive = good / nonZeroSum;
    return (
      <>
        <Result text={"good"} total={good} />
        <Result text={"neutral"} total={neutral} />
        <Result text={"bad"} total={bad} />
        <Result text={"all"} total={all} />
        <Result
          text={"all"}
          total={(good * 1 + neutral * 0 + bad * -1) / nonZeroSum}
        />
        <Result text={"positive"} total={positive} />
      </>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const Result = ({ text, total }) => {
  return (
    <div>
      {text} {total}
      {text === "positive" ? "%" : ""}
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const update = (setter, current) => {
    return () => {
      setter(current + 1);
    };
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={update(setGood, good)} text={"good"} />
      <Button clickHandler={update(setNeutral, neutral)} text={"neutral"} />
      <Button clickHandler={update(setBad, bad)} text={"bad"} />
      <h1>statistics</h1>
      <Statistics feedback={{ good, neutral, bad }} />
    </div>
  );
}

export default App;
