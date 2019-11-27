import React, { useState } from 'react';


// TODO
// A component that enables users search for a specific country
// using a search keyword and a displayinglist of macthed result.
// *Dsplay result in a list using the map array method.
//
// get properties for the matched countries
    // Capital
    // Population
    // Languages
    // Flag
const Find = ({ countries }) => {
    const [countryName, setCountryName] = useState('');


    const matches = [];
    const countryNameList = [];
    const countryObj = [];
    const matchObj = [];

    let matchesArr = [];


    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
    };

    const listCountries = () => {
        for (let i = 0; i < countries.length; i += 1) {
            countryNameList.push(countries[i].name);
            countryObj.push(countries[i]);
        }
    };
    listCountries();

    // used to chech the countryname against the list of countries for matches
    // result are stored in matche
    const findMatch = () => {
        for (let i = 0; i < countryNameList.length; i += 1) {
            if (countryNameList[i].toLowerCase().indexOf(countryName.toLowerCase()) >= 0) {
                matches.push(countryNameList[i]);
            }
        }
    };
    findMatch();

    // TODO:
        // modify matches to use the show botton
        // configure the show button todisplay the info of the matches
            // *steps
            // get the match object for the matches from countryObj array


    // Displays the matches for a search
    // checks the lenght of the array of matches (<=10)
    const countryMatchObj = [];
    const showMatches = () => {
        // matches
        // countryObj
        console.log(matches);
        console.log(countryObj);

        const handleClickShow = () => {
            countryObj.forEach((item) => {
                if (matches.includes(item.name)) {
                    countryMatchObj.push(item);
                }
            });
        };
        console.log(countryMatchObj);

        const matchResult = () => {
            if (matches.length <= 10) {
                return (
                    <div>
                        {
                            matches.map(match => <p>{match} <button onClick={() => handleClickShow()}>show</button></p>)
                        }
                    </div>
                    // <div>{countryMatchObj}</div>
                );
            } else {
                return 'Too many matches spcify another filter!'
            };
        };
        // create a dupliccate of the matches in the matchesArr array.
        matchesArr = matchesArr.concat(matches);


        const disp = () => {
            if (countryName !== '') {
                return matchResult();
            }
            return ' ';
        }
        return disp();
    };


    // displays the details of the country found from the search
    // using data from the countryObj
    // countryObj contains the information of all the matches.
    const showMatchDetails = () => {
        console.log(countryObj);
        for (let i = 0; i < countryObj.length; i += 1) {
            if (matches[0] === countryObj[i].name) {
                matchObj.push(countryObj[i]);
            }
        }
        console.log(matchObj[0].languages);

        const langlist = matchObj[0].languages;

        const dispMatchLang = () => langlist.map(lang => <li>{lang.name}</li>);


        return (
            <div>
                <h1>{matchObj[0].name}</h1>
                <p>capital {matchObj[0].capital}</p>
                <p>population {matchObj[0].population}</p><br />

                <h3>languages</h3>
                <p>{dispMatchLang()}</p>
                <img
                    src={matchObj[0].flag}
                    alt="Match Flag!!!"
                    height="120px"
                    width="150px" />
            </div>
        );
    };

    const showCountries = (matches.length === 1) ? showMatchDetails() : showMatches();

    return (
        <div>
            <div>
        find countries <input
            type="text"
            value={countryName}
            onChange={handleCountryNameChange} />
            </div>
            <div>
                {showCountries}
            </div>
        </div>
    );
};

export default Find;