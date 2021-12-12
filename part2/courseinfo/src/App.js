import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part, i) => {
        return <Part key={i} part={part} />;
      })}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

const Total = ({ course: { parts } }) => {
  const total = parts.reduce((all, part) => all + part.exercises, 0);
  return <strong>total of {total} exercises</strong>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of component",
        exercises: 14,
      },
      {
        name: "Redux",
        exercises: 11,
      },
    ],
  };

  return (
    <>
      <Course course={course} />
      <Total course={course} />
    </>
  );
};

export default App;
