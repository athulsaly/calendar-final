import React from 'react'
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import AddEvent from './AddEvent';
import moment from 'moment';
import { Alert } from '@mui/material';
import { Dialog } from '@mui/material';

function AddEventModal(props) {
    const eventStart = props.eventStart
    const eventEnd = props.eventEnd
    const [openWarning, setOpenWarning] = React.useState(false)
    const handleWarningOpen = () =>setOpenWarning(true)
    const handleWarningClose = () => setOpenWarning(false)
    React.useEffect(() => {
        if(moment(eventStart) <= moment()){
            handleWarningOpen()
        }
    }, [props.eventStart])

    return (
       moment(eventStart) <= moment() ? 
       <Dialog open={openWarning} onClose={handleWarningClose}><Alert severity="error">{moment(eventStart) <= moment()? 'Can\'t make bookings in the past.' : 'Invalid Date or Time.'}</Alert></Dialog>

       : <Modal visible={props.open} onCancel={props.onClose}
            footer={[
                <Button key="back" onClick={props.onClose}>
                    Cancel
                </Button>
            ]}
        >

            <AddEvent
                start={props.eventStart}
                end={props.eventEnd}
                onTimeChange={props.onTimeChange}
                onClose={props.onClose}
                startDate={props.date}

            />


        </Modal >
    )
}

export default AddEventModal