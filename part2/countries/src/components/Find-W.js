import React, { useState } from 'react';


// TODO
// A component that enables users search for a specific country
// using a search keyword and a displayinglist of macthed result.
// Dsplay result in a list using the map array method.
const Find = ({ countries }) => {
    const [countryName, setCountryName] = useState('');
    // const [matches] = useState(matched);

    const matches = [];
    const countryNameList = [];

    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
    };
    const showMatches = () => {
        // TODO:
        // move the code to get the name of the list to the App component
        const listCountries = () => {
            for (let i = 0; i < countries.length; i += 1) {
                countryNameList.push(countries[i].name);
                // console.log(countryNameList);
            }
            // console.log(countryName);
        };
        listCountries();
        // console.log(countryNameList);

        const findMatch = () => {
            for (let i = 0; i < countryNameList.length; i += 1) {
                if (countryNameList[i].toLowerCase().indexOf(countryName.toLowerCase()) >= 0) {
                    matches.push(countryNameList[i]);
                }
            }
        };
        findMatch();
        console.log(matches);

        const matchResult = () => {
            if (matches.length <= 10) {
                return matches;
            }
            return 'Too many matches spcify another filter!';
        };
        const disp = () => {
            if (countryName !== '') {
                return matchResult();
            }
            return ' ';
        };

        return disp();
    };

    return (
        <div>
            <div>
        find countries <input
            type="text"
            value={countryName}
            onChange={handleCountryNameChange} />
            </div>
            <div>
                {showMatches()}
            </div>
        </div>
    );
};

export default Find;
