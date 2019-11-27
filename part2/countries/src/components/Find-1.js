import React, { useState } from 'react';


// TODO
// A component that enables users search for a specific country
// using a search keyword and a displayinglist of macthed result.
// Dsplay result in a list using the map array method.
const Find = ({ countries, matches }) => {
    const [countryName, setCountryName] = useState('');
    // const [matched] = useState([]);

    // const matches = [];
    const countryNameList = [];

    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
    };
    console.log(countries);

    const showMatches = () => {
        // TODO:
        const listCountries = () => {
            for (let i = 0; i < countries.length; i += 1) {
                countryNameList.push(countries[i].name);
                console.log(countryNameList);
            }
            // console.log(matches);
            // console.log(countryName);
        };
        listCountries();
        console.log(countryNameList);

        const findMatch = (list) => {
            const check = () => {
                for (let i = 0; i < list.length; i += 1) {
                    if (list[i].toLowerCase().indexOf(countryName.toLowerCase()) >= 0) {
                        matches.push(list[i]);
                    }
                }
            };
            check(countryNameList);
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
        return findMatch();
    };

    // setMatched(matches);

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
