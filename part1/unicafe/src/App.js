import { useState } from "react";

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
  let all = good + neutral + bad;
  let nonZeroSum = all === 0 ? 1 : all;
  let positive = good / nonZeroSum;

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={update(setGood, good)} text={"good"} />
      <Button clickHandler={update(setNeutral, neutral)} text={"neutral"} />
      <Button clickHandler={update(setBad, bad)} text={"bad"} />
      <h1>statistics</h1>
      <Result text={"good"} total={good} />
      <Result text={"neutral"} total={neutral} />
      <Result text={"bad"} total={bad} />
      <Result text={"all"} total={all} />
      <Result
        text={"all"}
        total={(good * 1 + neutral * 0 + bad * -1) / nonZeroSum}
      />
      <Result text={"positive"} total={positive} />
    </div>
  );
}

export default App;
