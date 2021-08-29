import React, { useEffect, useState } from 'react';

import constants from '../constants';
import Loader from './loader';
import SearchBar from './searchBar';
import StateCard from './stateCard';

function App() {
    const [covidStatesData, setCovidStatesData] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        fetch(
            constants.global.BASE_API_URI +
                constants.global.COVID_STATES_DATA_API,
        ).then(async (response) => {
            const data = await response.json();
            if (data.status === 'success') {
                setCovidStatesData(data.data);
            }
            setIsDataLoading(false);
        });
    }, []);

    return (
        <div>
            <SearchBar />
            {isDataLoading && <Loader />}
            {!isDataLoading &&
                covidStatesData.map((data, index) => (
                    <StateCard stateData={data} key={index} />
                ))}
        </div>
    );
}

export default App;
