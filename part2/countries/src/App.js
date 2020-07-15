import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Find from './components/Find';

function App() {
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState('');

    // make a HTTP request to the restcountries API and use the
    // javascrit promse to set the API responce to the variale name countries
    const hook = (() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response) => {
                console.log(response.data);
                setCountries(response.data);
            });
    });
    useEffect(hook, []);

    // const defaultCountry = countries.find(country => country.name === 'Nigeria');


    return (
        <div>
            <h2>Countries</h2>
            <Find
                countries={countries}
                countryName={countryName}
                setCountryName={setCountryName} />
        </div>
    );
}

export default App;
