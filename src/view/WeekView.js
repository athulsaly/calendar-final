import React, { useEffect, useState } from 'react'
import AddEventModal from './components/AddEventModal'
import EventHighlighter from './components/EventHighlighter'
import TimeSlotGroup from './components/TimeSlotGroup'
import WeekHeader from './components/WeekHeader'
import WeekToolbar from './components/WeekToolbar'
import { times, getAllDaysInTheWeek } from './utils';
import moment from 'moment';
import { container } from '../styles'
import crud from './api/crud'

function WeekView() {
    useEffect(() => {
        const fetchData = async () => {
            const result = await crud.get('/post');

            setEvents(result.data);
        };
        fetchData();
    }, []);


    const handleCloseAdd = () => {
        setAdd(false)
    }
    const [startDate, setStartDate] = useState(+moment());
    const [weekDays, setWeekDay] = useState(getAllDaysInTheWeek())
    const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);
    const [events, setEvents] = useState([]);

    const [showDialogAdd, setAdd] = useState(false)
    const handleOpenAdd = (dateStamp, time) => {
        const start = moment(dateStamp).set('hour', time)
        const end = start.clone().add(1, 'hour')
        setEventStart(+start)
        setEventEnd(+end)
        setAdd(true)
    }


    const goToNextWeek = () => {
        const dateAfter7Days = moment(startDate).add(7, 'days')

        setStartDate(+dateAfter7Days)
        setWeekDay(getAllDaysInTheWeek(dateAfter7Days))

    }
    const goToPreviousWeek = () => {
        const dateBefore7Days = moment(startDate).subtract(7, 'days')

        setStartDate(+dateBefore7Days)
        setWeekDay(getAllDaysInTheWeek(dateBefore7Days))

    }
    const goToToday = () => {

        setStartDate(+moment())
        setWeekDay(getAllDaysInTheWeek())

    }
    const onCurrentEventTimeChange = dates => {

        setEventStart(+dates[0])
        setEventEnd(+dates[1])
    };


    return (

        <div style={container}>
            <AddEventModal
                open={showDialogAdd}
                onClose={handleCloseAdd}
                onClick={handleOpenAdd}
                eventStart={eventStart}
                eventEnd={eventEnd}
                onTimeChange={onCurrentEventTimeChange}
            />
            <WeekToolbar
                goToPreviousWeek={goToPreviousWeek}
                goToNextWeek={goToNextWeek}
                startDate={startDate}
                goToToday={goToToday}
            />
            <WeekHeader weekDays={weekDays} />
            {times.map(time => (
                <TimeSlotGroup
                    key={time}
                    time={time}
                    events={events[time]}
                    weekDays={weekDays}
                    openAddEventModal={handleOpenAdd}
                    eventStart={eventStart}
                    eventEnd={eventEnd}
                    onTimeChange={onCurrentEventTimeChange}
                >
                    {events[time] &&
                        events.map(
                            event =>
                                event.startWeek <= moment(startDate).week() &&
                                event.endWeek >= moment(startDate).week() &&
                                <EventHighlighter
                                    key={event.title + event.end + event.start}
                                    startDate={startDate}
                                    eventStart={eventStart}
                                    eventEnd={eventEnd}
                                    onTimeChange={onCurrentEventTimeChange}
                                    event={event}

                                />

                        )}
                </TimeSlotGroup>
            ))}
        </div>
    )
}

export default WeekView