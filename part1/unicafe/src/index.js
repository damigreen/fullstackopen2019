import React, { useState } from 'react';
import ReactDOM from 'react-dom';


/*
*23:10:19
*unicafe feedback app
 */

const App = () => {
    const [good, setGood] = useState([0, 1]);
    const [neutral, setNeutral] = useState([0, 0]);
    const [bad, setBad] = useState([0, -1]);
    const [all, setAll] = useState([0, 1]);
    const [average, setAverage] = useState([0, 0]);
    const [positive, setPositive] = useState([0, 0]);

    const clickGood = () => {
        setGood([
            good[0] + 1,
            good[1],
        ]);
        setAll([
            all[0] + 1,
            all[1] + 1,
        ]);
        setAverage([
            average[0] + good[1],
            (average[0] + good[1]) / all[1],
        ]);
        setPositive([
            positive[0] + good[1], ((positive[0] + good[1]) / all[1]) * 100,
        ]);
    };

    const clickNeutral = () => {
        setNeutral([
            neutral[0] + 1,
            neutral[1],
        ]);
        setAll([
            all[0] + 1,
            all[1] + 1,
        ]);
        setAverage([
            average[0] + neutral[1],
            (average[0] + neutral[1]) / all[1],
        ]);
        setPositive([
            positive[0], (positive[0] / all[1]) * 100,
        ]);
    };

    const clickBad = () => {
        setBad([
            bad[0] + 1,
            bad[1],
        ]);
        setAll([
            all[0] + 1,
            all[1] + 1,
        ]);
        setAverage([
            average[0] + bad[1],
            (average[0] + bad[1]) / all[1],
        ]);
        setPositive([
            positive[0], (positive[0] / all[1]) * 100,
        ]);
    };


    return (
        <div>
            <h1>give feedback</h1>
            {/* <button onClick={() => clickGood()} >good</button>
            <button onClick={() => clickNeutral()}>neutral</button>
            <button onClick={() => clickBad()}>bad</button>
            <br /> */}
            <Buttons setClick={clickGood} value="good" />
            <Buttons setClick={clickNeutral} value="neutral" />
            <Buttons setClick={clickBad} value="bad" />

            <h1>Statistics</h1>
            <table>
                <Statistics text="good" value={good[0]} />
                <Statistics text="neutral" value={neutral[0]} />
                <Statistics text="bad" value={bad[0]} />
                <Statistics text="all" value={all[0]} />
                <Statistics text="average" value={average[1]} />
                <Statistics text="positive" value={positive[1]} unit="%" />
            </table>
        </div>
    );
};
const Statistics = (props) => {
    // console.log(props);
    const { text, value, unit } = props;

    return (
        <tbody>
            <tr>
                <td>{text}</td>
                <td>{value} {unit}</td>
            </tr>
        </tbody>
    );
};
const Buttons = (props) => {
    const { setClick, value } = props;
    return (
        <button onClick={() => setClick()}>{value}</button>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

