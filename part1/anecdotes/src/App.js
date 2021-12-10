import { useState } from "react";

const Title = ({text}) => {
  return <h1>{text}</h1>;
};

const Button = ({ action, text }) => {
  return <button onClick={action}>{text}</button>;
};

const Anecdote = ({ anecdotes, points, selected }) => {
  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {points} votes</div>
    </>
  );
};

const BestAnecdote = ({ allPoints, anecdotes }) => {
  const max = Math.max(...allPoints);
  if (allPoints.every((el) => el === 0)) {
    return <div>No votes yet</div>;
  } else {
    return (
      <>
        <div>{anecdotes[allPoints.indexOf(max)]}</div>
        <div>has {max} votes</div>
      </>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(0);
  const [allPoints, setAllPoints] = useState(
    new Array(anecdotes.length).fill(0)
  );
  const selectAnecdote = () => {
    const pickRandom = Math.floor(Math.random() * anecdotes.length);
    setPoints(allPoints[pickRandom]);
    setSelected(pickRandom);
  };

  const increment = () => {
    const copy = [...allPoints];
    copy[selected] += 1;
    setPoints(copy[selected]);
    setAllPoints(copy);
  };

  return (
    <>
      <Title text="Anecdote of the day" />
      <Anecdote points={points} anecdotes={anecdotes} selected={selected} />
      <Button action={increment} text="vote" />
      <Button action={selectAnecdote} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <BestAnecdote allPoints={allPoints} anecdotes={anecdotes} />
    </>
  );
};

export default App;
