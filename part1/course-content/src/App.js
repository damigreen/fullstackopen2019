import React from 'react';
import Course from './Course';

const App = ({ courseList }) => (
    <div>
        <Course
            course={courseList} />
    </div>
    );

export default App;
