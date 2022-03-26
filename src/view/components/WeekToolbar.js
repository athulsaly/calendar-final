import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import { CalendarMonth, NavigateBefore, NavigateNext } from '@mui/icons-material';
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
        <Row type="flex" gutter={4} style={toolbar}>
            <Col span={6} offset={3} style={appTitle}>
                <CalendarMonth style={spacify} fontSize="medium" />Booking Calendar
            </Col>

            <Col span={3} offset={10} style={alignRight}>
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