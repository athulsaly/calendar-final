import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import { CalendarMonth, Circle, NavigateBefore, NavigateNext } from '@mui/icons-material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
    toolbar,
    toolbarDate,
    appTitle,
    alignRight,
    spacify
} from '../../styles';
import moment from 'moment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function WeekToolbar(props) {
    const formattedDate = moment(props.startDate).format('MMM YYYY')
    const [view, setView] = React.useState('Week View');


    const handleChange = (event) => {
        setView(event.target.value);
        handleView(event.target.value)
    };
    const handleView = (nextView) => {
        if (nextView === 'Week View') {

            props.week()
        }
        else if (nextView === 'Month View') { props.month() }

    }

    return (
        <Row justify='center' type="flex" gutter={4} style={toolbar}>
            <Col span={6} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" />Booking Calendar
                &nbsp;&nbsp;&nbsp;

                <FormControl variant='standard' style={{ minWidth: 120 }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={view}
                        notched="false"
                        label={view}
                        onChange={handleChange}
                    >
                        <MenuItem value={'Week View'}>Week View</MenuItem>
                        <MenuItem value={'Month View'}>Month View</MenuItem>

                    </Select>
                </FormControl>
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