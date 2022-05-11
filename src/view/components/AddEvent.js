import React, { useEffect, useState } from 'react';
import { /* Input, */ DatePicker } from 'antd';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { Typography, Select, MenuItem, Autocomplete, TextField } from "@mui/material";
import { kitchenStatuses } from '../enum';
/* import crud from '../api/crud'; */
import Button from '@mui/material/Button';
import axios from 'axios';
const { RangePicker } = DatePicker;


function AddEvent(props) {
    const users = ["Athul","Athul Saly", "Hassan Badru", "Denzil George", "Jack Ma"]
    const kitchen_statuses = kitchenStatuses()
    /* const [title, setTitle] = useState('')
      const [kitchen_Id, setId] = useState('')
    const [description, setDescription] = useState('') */
    const [username, setUsername] = useState('')
    const [cost, setCost] = useState('')
    const [status, setStatus] = useState('Created')
    const [value, setValue] = useState(users[0])
    const costPerHr = 20
    const duration = moment( moment(props.end)-moment(props.start))
    const timeFactor = duration._i ;
    const hours = (timeFactor / 1000 / 60 / 60);
    let totalCost = costPerHr * hours

    useEffect(() => {
        let totalCost = costPerHr * hours
        setCost(totalCost)
    }, [hours]);

    /* const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);
    const onTimeChange = (dates) => {

        setEventStart(+dates[0])
        setEventEnd(+dates[1])
    }; */


    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    let kitchen_id = '105';
    /* console.log(moment(props.start)) */
    const createBooking = () => {
       
        axios.post(`https://yft2x0eiuc.execute-api.us-east-1.amazonaws.com/qa/kitchens/${kitchen_id}/bookings`,
            {
                /* id: '', */
                /* title: title === '' ? "N/A" : title, */
                title: "Flavour's Kitchen",
                /* description: description === '' ? "N/A" : description, */
                description: "Flavour's is a brand new kitchen with all the amazing amenities provided at no extra cost.",
                status: status === null ? "N/A" : status,
                member_id: username === '' ? value : username,
                start: props.start.toString(),
                end: props.end.toString(),
                /* kitchen_id: moment(props.start).week() + title + moment(props.start).hours(), */
                total_fee: cost === '' ? "0.00" : parseFloat(cost).toFixed(2),
                /* startWeek: moment(props.start).week(),
                endWeek: moment(props.end).week(), */
                /* time: moment(props.start).hours() */
            })
        /* setTitle('')
        setId('')
        setDescription('') */
        setUsername('')
        setCost('')
        setStatus('Created')
        setValue(users[0])
        props.onClose()

    }

    return (
        <React.Fragment>
            <Typography align="center" variant="h6" style={{ color: "#5DB6CE" }}>Create Booking</Typography>
            {/* <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Kitchen Name" style={{ margin: '1%' }} autoFocus={true} /> */}
            {/*   <Input value={kitchen_Id} onChange={(e) => setId(e.target.value)} type="number" placeholder="Kitchen ID" label="Kitchen ID" variant="outlined" style={{ margin: '1%' }} /> */}
            {/* <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" label="Kitchen Description" type="text" variant="outlined" style={{ margin: '1%' }} /> */}
            {/* <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" label="Username" variant="outlined" style={{ margin: '1%' }} /> */}

            <Autocomplete
                style={{ margin: '1%' }}
                fullWidth
                disablePortal
                id="combo-box-demo"
                options={users}
                value={value}
                inputValue={username}
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                onInputChange={(event, username) => {
                    setUsername(username)
                }}
                renderInput={(params) => <TextField {...params} label="Username" /* onChange={(e) => setUsername(e.target.value)} */ />}
            />
            {/* <TextField fullWidth value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Cost" label="Cost" type="number" variant="outlined" style={{ margin: '1%' }} /> */}
            <Select
                value={status !=='' ? status : "default"}
                label="Status"
                variant="standard"
                notched="false"
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
                /* disabledDate={current => {
                    return current && current < moment().add(1, "month")
                }} */
                inputReadOnly={true}
                disabledDate={disabledDate}
                value={[moment(props.start), moment(props.end)]}
                onChange={(e) => props.onTimeChange(e)}
                showTime={{

                    format: 'HH:mm',
                    hourStep: 1,
                    minuteStep: 30,
                    defaultValue: [moment(props.start), moment(props.end)],
                }}
                format="MMM Do, YYYY hh:mm a"
            />
            <Typography variant='subtitle1'  component="div" sx={{color:'white', background:'#ff9202', textAlign:'center'}} style={{ margin: '1%',width: '100%' }}>{/* BaseCost: ${costPerHr} <br/> */}Total Cost/Hr: ${totalCost}</Typography>
            <Button disabled={moment(props.start) <= moment()} startIcon={<EditIcon />} style={{ backgroundColor: '#5DB6CE', color: '#fff', margin: '1%', width: '100%' }} onClick={createBooking} >Submit</Button>
        </React.Fragment >
    )
}

export default AddEvent