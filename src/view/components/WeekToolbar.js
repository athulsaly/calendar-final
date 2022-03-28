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



function WeekToolbar(props) {
    const formattedDate = moment(props.startDate).format('MMM YYYY')
    return (
        <Row justify='center' type="flex" gutter={4} style={toolbar}>
            <Col span={6} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" />Booking Calendar
            </Col>

            <Circle sx={{ color: '#FF8F00' }} style={appTitle} />&nbsp;Created&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#787C87' }} style={appTitle} />&nbsp;Pending&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#29D6D0' }} style={appTitle} />&nbsp;Confirmed&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#FF0009' }} style={appTitle} />&nbsp;Canceled&nbsp;&nbsp;&nbsp;
            <Circle sx={{ color: '#00FF39' }} style={appTitle} />&nbsp;Completed&nbsp;&nbsp;&nbsp;

            <Col span={2} offset={3} style={alignRight} >
                <ButtonGroup>
                    <Button onClick={props.goToPreviousWeek} startIcon={<NavigateBefore />} />
                    <Tooltip placement="topLeft" title={moment().format('dddd, MMM D')}>
                        <Button onClick={props.goToToday} /* variant="contained" */>Today</Button>
                    </Tooltip>
                    <Button onClick={props.goToNextWeek} icon="right" endIcon={<NavigateNext />} />
                </ButtonGroup>
            </Col>
            <Col span={2} style={toolbarDate}>
                {formattedDate}
            </Col>
        </Row>
    )
}

export default WeekToolbar