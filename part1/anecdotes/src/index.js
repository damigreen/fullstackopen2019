import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/*
*30:10:19
*software engineering anecdotes
*/
const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Array(6).fill(0));

    const clickFun = () => setSelected(Math.floor(Math.random() * props.anecdotes.length));

    const voter = () => {
        if (selected === 0) {
            const newVotes = [...votes];
            newVotes[0] += 1;
            setVotes(newVotes);
        }
        if (selected === 1) {
            const newVotes = [...votes];
            newVotes[1] += 1;
            setVotes(newVotes);
        }
        if (selected === 2) {
            const newVotes = [...votes];
            newVotes[2] += 1;
            setVotes(newVotes);
        }
        if (selected === 3) {
            const newVotes = [...votes];
            newVotes[3] += 1;
            setVotes(newVotes);
        }
        if (selected === 4) {
            const newVotes = [...votes];
            newVotes[4] += 1;
            setVotes(newVotes);
        }
        if (selected === 5) {
            const newVotes = [...votes];
            newVotes[5] += 1;
            setVotes(newVotes);
        }
        if (selected === 6) {
            const newVotes = [...votes];
            newVotes[6] += 1;
            setVotes(newVotes);
        }
    };

    return (
        <div>
            <h1>anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {votes[selected]} votes</p>
            <br />
            <br />
            <button onClick={() => voter()}>vote</button>
            <button onClick={() => clickFun()}>next anecdotes</button>
            <MostVotes anecdote={props.anecdotes} votes={votes} />

        </div>
    );
};

const anecdotes = [
    'If it hurts, do it more',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code account for the first 90 percent of the development time',
    'premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it',
    'Any fool can write a code that a computer can understand. Good programmes write code that humans can understand',
];

const MostVotes = (props) => {
    const { votes, anecdote } = props;

    const index = props.votes.indexOf(Math.max(...props.votes));


    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdote[index]} <strong>has {votes[index]} votes</strong></p>
        </div>
    );
};


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root'),
);

