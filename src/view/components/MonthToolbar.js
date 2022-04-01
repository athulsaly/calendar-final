import React from 'react';
import { Row, Col } from 'antd';
import { CalendarMonth, Circle } from '@mui/icons-material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
    toolbar,
    appTitle,
    spacify
} from '../../styles';
import { Typography } from '@mui/material';

import { Tooltip } from 'antd';


function MonthToolbar(props) {

    const [view, setView] = React.useState('list');

    const handleChange = (event, nextView) => {
        setView(nextView);
        handleView(nextView)

    };
    const handleView = (nextView) => {
        if (nextView === 'week') {

            props.week()
        }
        else if (nextView === 'month') { props.month() }

    }
    return (
        <Row justify='space-evenly' type="flex" gutter={4} style={toolbar}>
            <Col span={10} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" />Booking Calendar
                &nbsp;&nbsp;&nbsp;
                <ToggleButtonGroup
                    size="small"
                    value={view}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="week" aria-label="list">
                        <Tooltip placement="topLeft" title={'Week View'}>
                            <ViewListIcon />
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton value="month" aria-label="module">
                        <Tooltip placement="topRight" title={'Month View'}>
                            <ViewModuleIcon />
                        </Tooltip>
                    </ToggleButton>

                </ToggleButtonGroup>
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