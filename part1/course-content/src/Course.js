import React from 'react';

const Course = ({ course }) => (
    <div>
        <Content
            content={course} />
    </div>
);

const Content = ({ content }) => (
    <div>
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

const Total = ({ exercise }) => {
    const exArr = exercise.map(ex => ex.exercises);
    const total = exArr.reduce((ex1, ex2) => ex1 + ex2);
    return (
        <p><strong>total of {total} exercises</strong></p>
    );
};

export default Course;
