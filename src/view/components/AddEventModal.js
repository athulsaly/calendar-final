import React from 'react'
import Button from '@mui/material/Button';
import { Modal } from 'antd';
import AddEvent from './AddEvent';



function AddEventModal(props) {


    return (
        <Modal visible={props.open} onCancel={props.onClose}
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