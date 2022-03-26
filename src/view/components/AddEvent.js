import React, { useState } from 'react';
import { Input, DatePicker } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Typography, Select, MenuItem } from "@mui/material";
import { kitchenStatuses } from '../enum';
import crud from '../api/crud';
import Button from '@mui/material/Button';
const { RangePicker } = DatePicker;

function AddEvent(props) {
    const kitchen_statuses = kitchenStatuses()
    const [title, setTitle] = useState('')
    const [kitchen_Id, setId] = useState('')
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('')
    /* const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);
    const onTimeChange = (dates) => {

        setEventStart(+dates[0])
        setEventEnd(+dates[1])
    }; */
    const createBooking = () => {

        crud.post('/post',
            {
                id: '',
                title: title === '' ? 'Not given.' : title,
                description: description === '' ? 'Not given.' : description,
                status: status === null ? 'Not given.' : status,
                member: username === '' ? 'Not given.' : username,
                start: props.start,
                end: props.end,
                kitchen_id: kitchen_Id === '' ? 'Not given' : kitchen_Id,
                total_fee: cost === '' ? 'Not given.' : cost,
                startWeek: moment(props.start).week(),
                endWeek: moment(props.end).week(),
                time: moment(props.start).hours()
            })
        setTitle('')
        setId('')
        setDescription('')
        setUsername('')
        setCost('')
        setStatus('')
        props.onClose()
    }

    return (
        <React.Fragment>
            <Typography align="center" variant="h6" style={{ color: "#5DB6CE" }}>Create Booking</Typography>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Kitchen Name" style={{ margin: '1%' }} autoFocus={true} />
            <Input value={kitchen_Id} onChange={(e) => setId(e.target.value)} placeholder="Kitchen ID" label="Kitchen ID" variant="outlined" style={{ margin: '1%' }} />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" label="Kitchen Description" type="text" variant="outlined" style={{ margin: '1%' }} />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" label="Username" variant="outlined" style={{ margin: '1%' }} />
            <Input value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Cost" label="Cost" type="number" variant="outlined" style={{ margin: '1%' }} />
            <Select
                value={status ? status : "default"}
                label="Status"
                variant="outlined"
                onChange={(e) => setStatus(e.target.value)}
                style={{ margin: '1%', color: '#aaa', width: '100%' }}

            >
                <MenuItem value="default"  > -- Status -- </MenuItem>
                {
                    Object.keys(kitchen_statuses).map((status) => <MenuItem key={status} value={kitchen_statuses[status].value} >{kitchen_statuses[status].label}</MenuItem>)
                }

            </Select>

            <RangePicker
                style={{ width: '100%', margin: '1%' }}
                value={[moment(props.start), moment(props.end)]}
                onChange={props.onTimeChange}
                showTime={{
                    format: 'HH:mm',
                    hourStep: 1,
                    minuteStep: 30,
                    defaultValue: [moment(props.start), moment(props.end)],
                }}
                format="MMM Do, YYYY hh:mm a"
            />
            <Button startIcon={<EditIcon />} style={{ backgroundColor: '#5DB6CE', color: '#fff', margin: '1%', width: '100%' }} onClick={createBooking} >Submit</Button>
        </React.Fragment>
    )
}

export default AddEvent