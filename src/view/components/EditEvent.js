import React, { useState, useEffect } from 'react';
import { Input, DatePicker } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Typography, Select, MenuItem } from "@mui/material";
import { kitchenStatuses } from '../enum';
import crud from '../api/crud';
import Button from '@mui/material/Button';
const { RangePicker } = DatePicker;


function EditEvent(props) {
    const kitchen_statuses = kitchenStatuses()
    const [title, setTitle] = useState('')
    /*  const [kitchen_Id, setId] = useState('') */
    const [description, setDescription] = useState('')
    const [username, setUsername] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('')
    const [eventx, setEvents] = useState([])
    const [startx, setStartx] = useState('')
    const [endx, setEndx] = useState('')
    const id = props.event.id
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current <= moment().endOf('day');
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await crud.get('/post/' + id);

            setEvents(result.data);
        };
        fetchData();
    }, []);



    const timeChange = (date) => {
        setStartx(+date[0])
        setEndx(+date[1])
        props.onTimeChange(date)


    }


    const updateBooking = () => {
        props.onClose()
        crud.put(`/post/${id}`, {

            id: eventx.id,
            title: title === '' ? eventx.title : title,
            description: description === '' ? eventx.description : description,
            status: status === '' ? eventx.status : status,
            member: username === '' ? eventx.member : username,
            start: startx === '' ? props.event.start : startx,
            end: endx === '' ? props.event.end : endx,
            /* kitchen_id: kitchen_Id === '' ? eventx.kitchen_id : kitchen_Id, */
            kitchen_id: eventx.start + eventx.title + eventx.end,
            total_fee: cost === '' ? eventx.total_fee : cost,
            startWeek: startx === '' ? moment(props.event.start).week() : moment(startx).week(),
            endWeek: endx === '' ? moment(props.event.end).week() : moment(endx).week(),
            time: startx === '' ? moment(props.event.start).hours() : moment(startx).hours()


        })
        setTitle('')
        /*         setId('') */
        setDescription('')
        setUsername('')
        setCost('')
        setStatus('')
        eventx('')
        setStartx('')
        setEndx('')

    }



    return (
        <React.Fragment>
            <Typography align="center" variant="h6" style={{ color: "#5DB6CE" }}>Update Booking</Typography>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={props.event.title} label="Enter Kitchen Name" style={{ margin: '1%' }} autoFocus={true} />
            {/*  <Input value={kitchen_Id} onChange={(e) => setId(e.target.value)} placeholder={props.event.kitchen_id} type="number" label="Kitchen ID" variant="outlined" style={{ margin: '1%' }} /> */}
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder={props.event.description} label="Kitchen Description" type="text" variant="outlined" style={{ margin: '1%' }} />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder={props.event.member} label="Username" variant="outlined" style={{ margin: '1%' }} />
            <Input value={cost} onChange={(e) => setCost(e.target.value)} placeholder={props.event.total_fee} label="Cost" type="number" variant="outlined" style={{ margin: '1%' }} />
            <Select
                value={status ? status : props.event.status}
                label="Status"
                variant="standard"
                notched='false'
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

                inputReadOnly={true}
                disabledDate={disabledDate}
                value={startx === '' ? [moment(props.event.start), moment(props.event.end)] : [moment(startx), moment(endx)]}
                onChange={(date) => timeChange(date)}
                showTime={{
                    format: 'HH:mm',
                    hourStep: 1,
                    minuteStep: 30,
                    defaultValue: [moment(eventx.start), moment(eventx.end)],
                }}
                format="MMM Do, YYYY hh:mm a"
            />
            <Button startIcon={<EditIcon />} style={{ backgroundColor: '#5DB6CE', color: '#fff', margin: '1%', width: '100%' }} onClick={updateBooking} >Update</Button>
        </React.Fragment>
    )
}

export default EditEvent