import React, { useState, useEffect } from 'react';
import axios from 'axios';


// used to search for a specific country
// it takes a counry keyword and is set a a state
const SearchBox = ({ countryName, setCountryName }) => {
    const searchCountry = (event) => {
        setCountryName(event.target.value);
    };

    return (
        <div>
            find countries <input
                type="text"
                value={countryName}
                onChange={searchCountry} />
        </div>
    );
};

// this is used to render the search result for the matc=hed countries from the weather API
//
const ShowMatchDetails = ({ country }) => {
    const [temp, setTemp] = useState(0);
    const [icon, setIcon] = useState('');
    const [wind, setWind] = useState('');

    const dispMatchLang = () => country.languages.map(lang =>
        <li>{lang.name}</li>);

    // gets the weather information fo a particularmatch
    // makes a request to the openweather API for a particular city weather Information
    //
    const weatherInfo = () => {
        const hook = (() => {
            axios
                .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=57931c248a6c40409a3da993a10b5c0c`)
                .then((response) => {
                    const weatherData = response.data;
                    setTemp(weatherData.main.temp);
                    setIcon(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`);
                    setWind(`${weatherData.wind.speed.toString()}  m/s  ${weatherData.wind.deg.toString()}  degrees`);
                })
                .catch((err) => {
                    console.log('ERROR', err.response);
                });
        });
        useEffect(hook, []);

        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <strong>temperature: </strong>{temp} Kelvin<br />
                <img
                    src={icon}
                    alt={`weather icon for ${country.capital}`}
                    height="100px"
                    width="120px" /><br />
                <strong>Wind: </strong>{wind}
            </div>
        );
    };

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p><br />

            <h3>languages</h3>
            <p>{dispMatchLang()}</p>
            <img
                src={country.flag}
                alt={`${country.demonym}, Match Flag!!!`}
                height="120px"
                width="150px" />
            {weatherInfo()}
        </div>
    );
};

// Renders the matches for a particular query
// makes use of a show button to display the weather informaton of particular city.

const ShowMatches = ({ country, setCountryName }) => (
    <div key={country.name}>
        {/* the onclick handler sets the value of the input field to the
        renderd country using the state of the query */}
        {country.name} <button onClick={() => setCountryName(country.name)}>show</button>
    </div>
    );

    // returns a match fom the restcountries API
    // renders the mathes based on the number of matched countries found
//
const CountryDetails = ({ countries, countryName, setCountryName }) => {
    const matches = countries.filter(country =>
        country.name.toLowerCase().includes(countryName.toLowerCase()));
    if (matches.length === 1) {
        return <ShowMatchDetails country={matches[0]} />;
    } else if (matches.length <= 10) {
        console.log(matches);
        return matches.map(country => (
            <ShowMatches key={country.name} country={country} setCountryName={setCountryName} />
            ));
    } return <div>Too Many Matches, specify another filter</div>;
};

// A component that enables users search for a specific country
// using a search keyword and a displayinglist of macthed result.
//
const Find = ({ countries, countryName, setCountryName }) => (
    <div>
        <SearchBox setCountryName={setCountryName} />
        <CountryDetails countries={countries} countryName={countryName} setCountryName={setCountryName} />
    </div>
    );

export default Find;

