import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import { CalendarMonth, Circle, NavigateBefore, NavigateNext } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
    toolbar,
    toolbarDate,
    appTitle,
    alignRight,
    spacify
} from '../../styles';
import moment from 'moment';



function WeekToolbar(props) {
    const formattedDate = moment(props.startDate).format('MMM YYYY')
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
    const click = () => {
        console.log('jello')
        window.location.reload()
    }
    return (
        <Row justify='center' type="flex" gutter={4} style={toolbar}>
            <Col span={6} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" onClick={click} />Booking Calendar
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


            <Circle sx={{ color: '#FF8F00' }} style={appTitle} />&nbsp;Created&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#787C87' }} style={appTitle} />&nbsp;Pending&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#29D6D0' }} style={appTitle} />&nbsp;Confirmed&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#FF0009' }} style={appTitle} />&nbsp;Canceled&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#00FF39' }} style={appTitle} />&nbsp;Completed&nbsp;&nbsp;&nbsp;

            <Col span={5} /* offset={2} */ style={alignRight} >
                <ButtonGroup>
                    <Button onClick={props.goToPreviousWeek} startIcon={<NavigateBefore />} />
                    <Tooltip placement="topLeft" title={moment().format('dddd, MMM D')}>
                        <Button onClick={props.goToToday} /* variant="contained" */>Today</Button>
                    </Tooltip>
                    <Button onClick={props.goToNextWeek} icon="right" endIcon={<NavigateNext />} />
                </ButtonGroup>
            </Col>

            <Col /* span={2} */ offset={1} style={toolbarDate}>
                {formattedDate}
            </Col>
        </Row >
    )
}

export default WeekToolbar