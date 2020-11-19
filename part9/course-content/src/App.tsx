import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import './App.css';


const App: React.FC = () => {
  const courseName = "Half stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    },
  ];

  return (
    <div className="App">
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={courseParts} />

    </div>
  );
}

export default App;
