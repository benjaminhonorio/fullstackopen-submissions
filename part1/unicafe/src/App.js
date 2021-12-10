import { useState } from "react";

const Statistics = ({ feedback }) => {
  let { good, neutral, bad } = feedback;
  let all = good + neutral + bad;
  if (all !== 0) {
    let nonZeroSum = all === 0 ? 1 : all;
    let positive = good / nonZeroSum;
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine
          text="average"
          value={(good * 1 + neutral * 0 + bad * -1) / nonZeroSum}
        />
        <StatisticLine text="positive" value={positive} />
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
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
