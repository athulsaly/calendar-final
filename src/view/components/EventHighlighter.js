import React, { useState } from 'react'
import moment from 'moment'
import { generateWeekViewCoordinates } from '../utils'
import { eventHighlighter } from '../../styles'
/* import EditEventModal from './EditEventModal' */
import Booking from './Booking'


/* function generateRandomColor(event) {
         var letters = '0123456789ABCDEF';
     var randomColor = '#';
     for (var i = 0; i < 3; i++) {
         randomColor += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
     }
     const color = randomColor === '#ffffff' ? generateRandomColor() : randomColor;
     return color;
    if (event.status === 'Created')
        return '#FF8F00'
    else if (event.status === 'Pending')
        return '#787C87'
    else if (event.status === 'Confirmed')
        return '#29D6D0'
    else if (event.status === 'Canceled')
        return '#FF0009'
    else if (event.status === 'Completed')
        return '#00FF39'
    else
        return '#c90bf4'
} */

function generateBackground(event) {

    if (event === 'Created')
        return '#f0e29b'
    else if (event === 'Pending')
        return '#d5d5d5'
    else if (event === 'Confirmed')
        return '#d1fdfc'
    else if (event === 'Canceled')
        return '#ffd3ca'
    else if (event === 'Completed')
        return '#b8faba'
    else
        return '#c90bf4'
}
function generateText(event) {

    if (event === 'Created')
        return '#ff9202'
    else if (event === 'Pending')
        return '#5e5e5e'
    else if (event === 'Confirmed')
        return '#026b67'
    else if (event === 'Canceled')
        return '#b41a02'
    else if (event === 'Completed')
        return '#007300'
    else
        return '#fffff'
}


function EventHighlighter(props) {


    const [showDialogEdit, setEdit] = useState(false)
    const handleOpenEdit = () => {
        setEdit(true)
    }
    const handleCloseEdit = () => {

        setEdit(false)

    }

    let date = moment.duration(props.event.end - props.event.start)._data.days
    const topx = moment(props.event.start).minutes().toString()
    let color = generateText(props.event.status)
    return (
        <React.Fragment>
            {/* <EditEventModal
                event={props.event}
                open={showDialogEdit}
                onClose={handleCloseEdit}
                onClick={handleOpenEdit}
                start={props.eventStart}
                end={props.eventEnd}
                onTimeChange={props.onTimeChange}

            /> */}
            <Booking
                event={props.event}
                open={showDialogEdit}
                onClose={handleCloseEdit}
                onClick={handleOpenEdit}
            />
            <div

                onClick={handleOpenEdit}
                style={{
                    ...generateWeekViewCoordinates(
                        props.event,
                        props.startDate
                    ),
                    top: topx === '30' ? '50%' : '0%',
                    ...eventHighlighter,
                    backgroundColor: generateBackground(props.event.status),
                    opacity: 0.65,
                    boxShadow: date >= 1 ? '' : `0px 2px ${color}`,
                    borderRadius: '0px',
                    border: '0px'
                }}
            >

                <span style={{ fontSize: 12, fontWeight: 'bold', color: color, fontFamily: 'sans-serif' }}>
                    {props.event.member_id} <br />
                    {moment(JSON.parse(props.event.start)).format('hh:mm a')}
                    {' '}
                    -
                    {' '}
                    {moment(JSON.parse(props.event.end)).format('hh:mm a')}
                    <br />
                    {/*              Description: {props.event.description}
                    <br />
                    Cost: {props.event.total_fee}
                    <br />
                    Status: {props.event.status}
                    <br />
                    User: {props.event.member_id}
                    <br />
                    Date: {moment(JSON.parse(props.event.start)).format('DD dddd MMMM YYYY')} */}
                </span>
            </div>
        </React.Fragment >
    )
}


export default EventHighlighter


/* <EditEventModal
event={props.event}
open={showDialogEdit}
onClose={handleCloseEdit}
onClick={handleOpenEdit} */
/* start={props.eventStart}
end={props.eventEnd} */
/* onTimeChange={props.onTimeChange}

/> */