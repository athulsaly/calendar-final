import React from 'react'
import Button from '@mui/material/Button';
import crud from '../api/crud';
import { Modal } from 'antd';
import EditEvent from './EditEvent';


function EditEventModal(props) {

    const onDelete = () => {
        crud.delete(`/post/${props.event.id}`)
        props.onClose()
    }


    return (
        <Modal visible={props.open} onCancel={props.onClose}
            footer={[
                <Button key="back" onClick={() => onDelete()}>Delete</Button>,

            ]}
        >

            <EditEvent
                event={props.event}
                start={props.start}
                end={props.end}
                onTimeChange={props.onTimeChange}
                onClose={props.onClose}
            />


        </Modal >
    )
}

export default EditEventModal