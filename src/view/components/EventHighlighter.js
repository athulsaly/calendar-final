import React, { useState } from 'react'
import moment from 'moment'
import { generateWeekViewCoordinates } from '../utils'
import { eventHighlighter } from '../../styles'
import EditEventModal from './EditEventModal'
function generateRandomColor() {
    /*     var letters = '0123456789ABCDEF'; */
    var randomColor = '#';
    for (var i = 0; i < 3; i++) {
        randomColor += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
    }
    const color = randomColor === '#ffffff' ? generateRandomColor() : randomColor;
    return color;

}

function EventHighlighter(props) {
    /*     const [eventNewStart, setNewStart] = useState(null)
        const [eventNewEnd, setNewEnd] = useState(null) */
    const [showDialogEdit, setEdit] = useState(false)
    const handleOpenEdit = () => {
        setEdit(true)
    }
    const handleCloseEdit = () => {
        setEdit(false)
    }


    return (
        <React.Fragment>
            <EditEventModal
                event={props.event}
                open={showDialogEdit}
                onClose={handleCloseEdit}
                onClick={handleOpenEdit}
                /* start={props.eventStart}
                end={props.eventEnd} */
                onTimeChange={props.onTimeChange}
            />
            <div
                onClick={handleOpenEdit}
                style={{
                    ...generateWeekViewCoordinates(
                        props.event,
                        props.startDate
                    ),
                    top: '1%',
                    ...eventHighlighter,
                    backgroundColor: generateRandomColor(),
                    opacity: 0.65,
                }}
            >
                {props.event.title} <br />
                <span style={{ fontSize: 10 }}>
                    {moment(props.event.start).format('hh:mm a')}
                    {' '}
                    -
                    {' '}
                    {moment(props.event.end).format('hh:mm a')}
                </span>
            </div>
        </React.Fragment >
    )
}


export default EventHighlighter