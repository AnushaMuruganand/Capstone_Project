import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import "./WeatherDegreeToggle.css";

function WeatherDegreeToggle({ weatherDegree }) {
    const [degree, setDegree] = useState('celcius');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newDegree: string,
    ) => {
        setDegree(newDegree);
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={degree}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton className='toggleButton' value="celcius" onClick={() => weatherDegree("celcius")}>°C</ToggleButton>
            <ToggleButton className='toggleButton' value="farenheit" onClick={() => weatherDegree("farenheit")}>°F</ToggleButton>
        </ToggleButtonGroup>
    );
}

export default WeatherDegreeToggle;