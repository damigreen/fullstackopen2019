import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
    // const course = {
    //     name: 'Half Stack application development',
    //     parts: [
    //         {
    //             name: 'Fundamentals of React',
    //             exercises: 10,
    //             id: 1,
    //         },
    //         {
    //             name: 'Using props to pass data',
    //             exercises: 7,
    //             id: 2,
    //         },
    //         {
    //             name: 'State of a component',
    //             exercises: 14,
    //             id: 3,
    //         },
    //     ],
    // };
  const courses = [
      {
          name: 'Half Stack application development',
          id: 1,
          parts: [
              {
                  name: 'Fundamentals of React',
                  exercises: 10,
                  id: 1,
              },
              {
                  name: 'Using props to pass data',
                  exercises: 7,
                  id: 2,
              },
              {
                  name: 'State of a component',
                  exercises: 14,
                  id: 3,
              },
              {
                  name: 'Redux',
                  exercises: 11,
                  id: 4,
              },
          ],
      },
      {
          name: 'Node.js',
          id: 2,
          parts: [
              {
                  name: 'Routing',
                  exercises: 3,
                  id: 1,
              },
              {
                  name: 'Middlewares',
                  exercises: 7,
                  id: 2,
              },
          ],
      },
  ];


  return (
      <div>
          <Course course={courses} />
          {/* <Course course={courses[1]} /> */}
          {/* <Total
              ex1={course.parts[0].exercises}
              ex2={course.parts[1].exercises}
              ex3={course.parts[2].exercises}
              /> */}
      </div>
  );
};

const Course = ({ course }) => (
    <div>
        {/* <Header title={course[0].name} />
        <Content content={course[0].parts} />

        <Header title={course[1].name} />
        <Content content={course[1].parts} /> */}

        <Content
            content={course} />

    </div>
  );


const Content = ({ content }) => (
    <div>
        {/* <Part
            coursePart={content[0] />
        <Part
            name={content[1].name}
            exercise={content[1].exercises} />
            <Part
            name={content[2].name}
            exercise={content[2].exercises} /> */}
        <Header
            title={content[0].name} />
        <Part
            coursePart={content[0].parts[0]} />
        <Part
            coursePart={content[0].parts[1]} />
        <Part
            coursePart={content[0].parts[2]} />
        <Part
            coursePart={content[0].parts[3]} />
        <Total
            exercise={content[0].parts} />

        <Header
            title={content[1].name} />
        <Part
            coursePart={content[1].parts[0]} />
        <Part
            coursePart={content[1].parts[1]} />
        <Total
            exercise={content[1].parts} />
    </div>
);

const Header = ({ title }) => (
    <h1>{title}</h1>
);

const Part = ({ coursePart }) => (
    <div>
        <p> {coursePart.name} {coursePart.exercises}</p>
    </div>
);

// sum of the exercises
// const Total = ({ ex1, ex2, ex3 }) => (
//     <div>
            // <p><strong>total of {total} exercises</strong></p>
//     </div>
//     );

const Total = ({ exercise }) => {
    // const exArr = exercise.map(ex => ex.exercises);
    // const total = exArr.reduce((ex1, ex2) => ex1 + ex2);
    // return (
    //     <p><strong>total of {total} exercises</strong></p>
    // );
    const exArr = exercise.map(ex => ex.exercises);
    const total = exArr.reduce((ex1, ex2) => ex1 + ex2);
    return (
        <p><strong>total of {total} exercises</strong></p>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
