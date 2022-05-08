import React, { useEffect, useState } from 'react'
import AddEventModal from './components/AddEventModal'
import EventHighlighter from './components/EventHighlighter'
import TimeSlotGroup from './components/TimeSlotGroup'
import WeekHeader from './components/WeekHeader'
import WeekToolbar from './components/WeekToolbar'
import { times, getAllDaysInTheWeek } from './utils';
import moment from 'moment';
import { container } from '../styles'
/* import crud from './api/crud' */
import MonthView from './components/MonthView'
import MonthToolbar from './components/MonthToolbar'
import axios from 'axios'
import EventHighlighterr from './components/EventHighlighterr'


function WeekView() {

    useEffect(() => {
        let interval
        let kitchen_id = '105'
        const fetchData = async () => {
            const result = await axios.get(`https://yft2x0eiuc.execute-api.us-east-1.amazonaws.com/qa/kitchens/${kitchen_id}/bookings`);
            /* const result = await crud.get(`/post`); */

            setEvents(result.data);
        };
        fetchData();
        interval = setInterval(() => {

            fetchData()

        }, 2.5 * 1000)

        return () => {

            clearInterval(interval)

        }
    }, []);


    const handleCloseAdd = () => {
        setAdd(false)
    }
    const [startDate, setStartDate] = useState(+moment());
    const [weekDays, setWeekDay] = useState(getAllDaysInTheWeek())
    const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('week')

    const [showDialogAdd, setAdd] = useState(false)
    const handleOpenAdd = (dateStamp, time) => {
        const start = moment(dateStamp).set('hour', time)
        const end = start.clone().add(1, 'hour')
        setEventStart(+start)
        setEventEnd(+end)
        setAdd(true)
    }

    const handleWeek = () => {

        setView('week')
        goToToday()
    }
    const handleMonth = () => {

        setView('month')

    }
    const calWeek = (e) => {
        if (e !== undefined) {
            setView('week')
            changeWeek(e)

        }
        /*   else {
              setView('week')
              goToNextWeek()
          } */
    }
    const changeWeek = (e) => {

        const startChange = +moment(e).set()
        const dateAfterDays = moment(startChange)

        setStartDate(+dateAfterDays)
        setWeekDay(getAllDaysInTheWeek(dateAfterDays))
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
        (() => {
            if (view === 'week') {
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
                            week={handleWeek}
                            month={handleMonth}
                        />



                        <WeekHeader weekDays={weekDays} />
                        {times.map(time => (
                            <TimeSlotGroup
                                key={time}
                                time={time}
                                /* events={events[time]} */
                                weekDays={weekDays}
                                openAddEventModal={handleOpenAdd}
                                eventStart={eventStart}
                                eventEnd={eventEnd}
                                onTimeChange={onCurrentEventTimeChange}
                            >
                                {
                                    events.map(
                                        event =>
                                            (() => {
                                                /*  console.log(event) */
                                                let startTime = JSON.parse(event.start)
                                                let endTime = JSON.parse(event.end)
                                                if (time === moment(startTime).hours() && moment(startTime).format('YYYY') === moment(startDate).format('YYYY') && moment.duration(moment(endTime).diff(moment(startTime))).days() >= 1) {

                                                    return (
                                                        moment(startTime).week() <= moment(startDate).week() &&
                                                        moment(endTime).week() >= moment(startDate).week() &&
                                                        /*  moment(endTime).format('hh:00 a') !== '12:00 am' && */
                                                        <>
                                                            <EventHighlighterr
                                                                key={event.title + event.end + event.start + event.member_id}
                                                                startDate={startDate}
                                                                eventStart={eventStart}
                                                                eventEnd={eventEnd}
                                                                onTimeChange={onCurrentEventTimeChange}
                                                                event={event}

                                                            />
                                                            <EventHighlighter
                                                                key={event.title + event.end + event.start}
                                                                startDate={startDate}
                                                                eventStart={eventStart}
                                                                eventEnd={eventEnd}
                                                                onTimeChange={onCurrentEventTimeChange}
                                                                event={event}

                                                            />
                                                        </>
                                                    )
                                                }

                                                else if (time === moment(startTime).hours() && moment(startTime).format('YYYY') === moment(startDate).format('YYYY')) {

                                                    return (
                                                        moment(startTime).week() <= moment(startDate).week() &&
                                                        moment(endTime).week() >= moment(startDate).week() &&
                                                        /* moment(endTime).format('hh:00 a') !== '12:00 am' &&
 */
                                                        <EventHighlighter
                                                            key={event.title + event.end + event.start}
                                                            startDate={startDate}
                                                            eventStart={eventStart}
                                                            eventEnd={eventEnd}
                                                            onTimeChange={onCurrentEventTimeChange}
                                                            event={event}

                                                        />
                                                    )
                                                }


                                            })()
                                    )}


                            </TimeSlotGroup>

                        ))}
                    </div>
                )
            }
            else {
                return (
                    <div style={container}>
                        <div >

                            <MonthToolbar
                                goToPreviousWeek={goToPreviousWeek}
                                goToNextWeek={goToNextWeek}
                                startDate={startDate}
                                goToToday={goToToday}
                                week={handleWeek}
                                month={handleMonth}
                            />
                            <MonthView
                                week={calWeek}
                            />,

                        </div>
                    </div>
                )
            }
        })()
    )
}

export default WeekView