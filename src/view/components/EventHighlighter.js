import React, { useState } from 'react'
import moment from 'moment'
import { generateWeekViewCoordinates } from '../utils'
import { eventHighlighter } from '../../styles'
import EditEventModal from './EditEventModal'

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
                start={props.eventStart}
                end={props.eventEnd}
                onTimeChange={props.onTimeChange}
            />
            <div
                onClick={handleOpenEdit}
                style={{
                    ...generateWeekViewCoordinates(
                        props.event,
                        props.startDate
                    ),
                    top: (parseInt(props.event.time) - 1) * 100 + '%',
                    ...eventHighlighter,
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