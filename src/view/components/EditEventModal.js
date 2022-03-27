import React from 'react'
import Button from '@mui/material/Button';
import crud from '../api/crud';
import { Modal, Row } from 'antd';
import EditEvent from './EditEvent';
import { Delete } from '@mui/icons-material';



function EditEventModal(props) {

    const onDelete = () => {
        crud.delete(`/post/${props.event.id}`)
        props.onClose()
    }


    return (
        <Modal visible={props.open} onCancel={props.onClose}
            footer={[
                <Row align='center' onClick={() => onDelete()}>
                    <Delete fontSize='medium' />
                    <Button key="back" >Delete</Button>,
                </Row>
            ]}
        >

            <EditEvent
                event={props.event}
                /*  start={props.start}
                 end={props.end} */
                onTimeChange={props.onTimeChange}
                onClose={props.onClose}
            />


        </Modal >
    )
}

export default EditEventModal