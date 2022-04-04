import React from 'react';
import { Row, Col } from 'antd';
import { CalendarMonth, Circle } from '@mui/icons-material';
import {
    toolbar,
    appTitle,
    spacify
} from '../../styles';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function MonthToolbar(props) {

    const [view, setView] = React.useState('Month View');

    const handleChange = (event) => {
        setView(event.target.value);
        handleView(event.target.value)
    };
    const handleView = (nextView) => {
        if (nextView === 'Week View') { props.week() }
        else if (nextView === 'Month View') { props.month() }

    }
    return (
        <Row justify='space-evenly' type="flex" gutter={4} style={toolbar}>
            <Col span={8} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" />Booking Calendar
                &nbsp;&nbsp;&nbsp;

                <FormControl variant='standard' style={{ minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={view}
                        label={view}
                        notched="false"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Week View'}>Week View</MenuItem>
                        <MenuItem value={'Month View'}>Month View</MenuItem>

                    </Select>
                </FormControl>


            </Col>

            <Col /* span={6} */ offset={3} />
            <Circle sx={{ color: '#FF8F00' }} style={appTitle} />&nbsp;Created&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#787C87' }} style={appTitle} />&nbsp;Pending&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#29D6D0' }} style={appTitle} />&nbsp;Confirmed&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#FF0009' }} style={appTitle} />&nbsp;Canceled&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#00FF39' }} style={appTitle} />&nbsp;Completed&nbsp;&nbsp;&nbsp;

            <Typography>{/* <b>SELECT THE MONTH</b> */}</Typography>
        </Row >
    )
}

export default MonthToolbar