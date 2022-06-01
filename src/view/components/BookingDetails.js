import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography, TextField,  Select, MenuItem, Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './BookingDetails.css'
import Divider from '@mui/material/Divider';
import InfoIcon from '@mui/icons-material/Info';
/* import axios from 'axios'; */
import { /* useEffect, */ useState } from 'react';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog } from '@mui/material';
import { kitchenStatuses } from '../enum';
import { /* Input, */ DatePicker } from 'antd';
import locale from "antd/es/date-picker/locale/de_DE";
const { RangePicker } = DatePicker;


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
function generateText(event) {

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
function generateTextColor(event) {

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

function BookingDetails(props) {
    const [events] = useState(props.event);

    /* useEffect(() => {
        let kitchen_id = '103'
        let booking_id = '103_1001'
        const fetchData = async () => {
            const result = await axios.get(`https://yft2x0eiuc.execute-api.us-east-1.amazonaws.com/qa/kitchens/${kitchen_id}/bookings/${booking_id}`);
            const result = await crud.get(`/post`);

            setEvents(result.data);
        };
        fetchData();

    }, []);
 */
    /* const total_days = moment(JSON.parse(endx)).format('d') - moment(JSON.parse(startx)).format('d') === 0 ? '1' : moment(JSON.parse(endx)).format('d') - moment(JSON.parse(startx)).format('d') + 1 
    const tot_days = moment(moment(JSON.parse(startx)).diff(moment(JSON.parse(endx)))).format('DD')  */
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const startx = events.start === undefined ? '0' : events.start
    const endx = events.end === undefined ? '0' : events.end
    const duration = moment( moment(JSON.parse(endx))-moment(JSON.parse(startx)))
    const timeFactor = duration._i ;
    const hours = (timeFactor / 1000 / 60 / 60)
    const total = events.total_fee /* * total_days */
    const service_fee = parseFloat(total * .133).toFixed(2)
    const final = parseFloat(total) + parseFloat(service_fee)
    const kitchen_cost = total/hours

    const kitchen_statuses = kitchenStatuses()
    const [status, setStatus] = useState(events.status)
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    return (
       
        < Box sx={{ width: 'auto' }}>
             <Dialog open={open} onClose={handleClose}  PaperProps={{ sx: { width: "100%", height: "30%" } }}>
<>
<div style={{backgroundColor: '#5DB6CE', height:'10%' ,color:'white'}} ><Typography align='center' margin="1%">Update Details</Typography></div>

<Select
                value={status !=='' ? status : "default"}
                label="Status"
                variant="standard"
                notched="false"
                onChange={(e) => setStatus(e.target.value)}
                style={{ marginTop:'5%', marginLeft: '10%', marginRight:'10%', color: '#aaa', width: '80%' }}

            >
                <MenuItem value="default"  > -- Status -- </MenuItem>
                {
                    Object.keys(kitchen_statuses).map((status) => <MenuItem key={status} value={kitchen_statuses[status].value} >{kitchen_statuses[status].label}</MenuItem>)
                }
            </Select>
            <RangePicker 
            style={{marginTop:'5%', width: '80%', marginLeft: '10%', marginRight:'10%' }}
                locale={{
                    ...locale,
                    lang: {
                      ...locale.lang,
                     
                      ok: "Press this button to confirm selection.",
                    }
                  }}
                /* disabledDate={current => {
                    return current && current < moment().add(1, "month")
                }} */
                inputReadOnly={true}
                disabledDate={disabledDate}
                value={[moment(JSON.parse(events.start)), moment(JSON.parse(events.end))]}
                onChange={(e) => props.onTimeChange(e)}
                showTime={{

                    format: 'HH:mm',
                    hourStep: 1,
                    minuteStep: 30,
                    defaultValue: [moment(JSON.parse(events.start)), moment(JSON.parse(events.end))],
                }}
                format="MMM Do, YYYY hh:mm a"
            />
            <Typography variant='subtitle1'  component="div" sx={{color:'white', background:'#ff9202', textAlign:'center'}} style={{ marginTop:'2.5%', marginLeft: '10%', marginRight:'10%',width: '80%' }}>{/* BaseCost: ${costPerHr} <br/> */}Total Cost/Hr: ${/* {totalCost} */}</Typography>
            <Button disabled={moment(props.start) <= moment()} startIcon={<EditIcon />} style={{ backgroundColor: '#5DB6CE', color: '#fff', marginTop:'2%', marginLeft: '10%', marginRight:'10%',width: '80%'  }} /* onClick={createBooking} */ >Submit</Button>
       
     
       
</>
             </Dialog>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Grid>
                        <h2 style={{ float: 'left' }} className='heading2'>Booking Details</h2>
                        <Box style={{cursor: 'pointer', color:'#5DB6CE'}} onClick={handleOpen}>
                        <p style={{ float: 'right', alignItems:'end'/* cursor: 'pointer' */ }} className='heading2'>Edit  <EditIcon style={{display:'unset'}}/></p>
                        </Box>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item>
                            <Img sx={{ boxShadow: 1, width: 250, height: 150, borderRadius: 2 }} alt="complex" src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80" />
                        </Grid>

                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b className='heading1'>{events.title}</b>
                                    <Box textAlign="center" alignSelf="center" className='title2' color={generateTextColor(events.status)} backgroundColor={generateText(events.status)} >
                                        {events.status}
                                    </Box>
                                </Typography>
                                <div style={{ display: "flex", alignItems: 'flex-start' }}>
                                    <LocationOnIcon /> &nbsp;
                                    <Typography style={{ width: 'auto' }} className='title2'>
                                        5832 Georgia Ave NW, Washington, Washington, D.C, DC 20011, USA
                                    </Typography>
                                </div>
                                <br />
                            </Grid>


                        </Grid>

                    </Grid>
                    <br />
                    <br />
                    <Divider style={{
                        width: '100%',
                    }} />
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} columns={16}>
                            <Grid item xs={8}>
                                <p className='titlex'>From</p>
                                <p className='title2'>{moment(JSON.parse(startx)).format('Do MMM YYYY, hh:mm A')}</p>
                                <p className='titlex'>First Name</p>
                                <p className='title2'>John</p>
                                <p className='titlex'>Phone Number</p>
                                <p className='title2'>+45 436 785 545</p>

                            </Grid>
                            <Grid item xs={8}>
                                <p className='titlex'>To</p>
                                <p className='title2'>{moment(JSON.parse(endx)).format('Do MMM YYYY, hh:mm A')}</p>
                                <p className='titlex'>Last Name</p>
                                <p className='title2'>Maxwell</p>
                                <p className='titlex'>Email</p>
                                <p className='title2' itemType='tel'>john.maxwell@gmail.com</p>

                            </Grid>
                        </Grid>
                    </Box>

                    <br />
                    <Divider style={{
                        width: '100%',
                    }} />
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} columns={16}>
                            <Grid item xs={8}>
                                <p className='heading3'>{/* ${events.total_fee} */} ${kitchen_cost} x {hours} {hours === 1 ? 'Hour' : 'Hours'} {/* {total_days} */} {/* {total_days === '1' ? 'Day' : 'Days'} */}</p>
                                <p className='heading3'>Service fee</p>
                            </Grid>
                            <Grid item xs={8}>
                                <p className='heading3' style={{ textAlign: 'center' }}>${total}</p>
                                <p className='heading3' style={{ textAlign: 'center' }}>${service_fee}</p>
                            </Grid>
                        </Grid>
                    </Box>


                    <br />
                    <Divider style={{
                        width: '100%',
                    }} />
                    <br />
                    <Grid container spacing={1} columns={16}>
                        <Grid item xs={8}>
                            <p className='heading3'>Total</p>
                        </Grid>
                        <Grid item xs={8}>
                            <p className='heading3' style={{ color: '#5DB6CE' }}>${final.toFixed(2)}</p>
                        </Grid>
                    </Grid>
                </Grid >


                <Grid item xs={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container justifyContent='space-between'>
                        <h2 style={{ float: 'left' }} className='heading2'>Payment</h2>
                        <CloseIcon onClick={props.onClose} style={{ cursor: "pointer" }} />
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item style={{ display: 'inline-flex' }}>
                            <p className='heading3' style={{ color: '#5DB6CE' }}>${final.toFixed(2)}</p>&nbsp;<p className='heading3' style={{ color: '#7A7A7A' }}>for {hours} {hours === 1 ? 'Hour' : 'Hours'} {/* {total_days} {total_days === '1' ? 'Day' : 'Days'} */}</p>
                        </Grid>

                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Img sx={{ boxShadow: 1, width: 100, height: 50, borderRadius: 2 }} alt="visa" src="https://usa.visa.com/dam/VCOM/blogs/visa-blue-gradient-800x450.jpg" />
                        </Grid>

                        <Grid item>
                            <Img sx={{ boxShadow: 1, width: 100, height: 50, borderRadius: 2 }} alt="visa" src="https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/118579/mastercard.jpg?w=940&ar=2:1&fit=crop&crop=faces,edges&auto=format&dpr=1" />
                        </Grid>

                    </Grid>
                    <br />

                    <Box sx={{ flexGrow: 1 }}>

                        <p className='title3' >First Name</p>
                        <TextField
                            fullWidth
                            id="first-name"
                            className='inputRounded'
                            label="First Name"
                        />
                        <p className='title3' >Last Name</p>
                        <TextField
                            fullWidth
                            id="last-name"
                            className='inputRounded'
                            label="Last Name"
                        />
                        <p className='title3' >Card Number</p>
                        <TextField
                            fullWidth
                            id="card-number"
                            className='inputRounded'

                            label="Card Number"
                        />

                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} columns={16}>
                            <Grid item xs={8}>
                                <p className='title3'  >Expiration</p>
                                <TextField
                                    fullWidth
                                    id="expiration"
                                    className='inputRounded'
                                    label="Expiration"

                                />

                            </Grid>
                            <Grid item xs={8}>
                                <p className='title3' >CVV</p>
                                <TextField
                                    className='inputRounded'
                                    fullWidth
                                    id="cvv"
                                    type='password'
                                    autoComplete='disabled'
                                    label='CVV'
                                />
                            </Grid>
                        </Grid>

                    </Box>
                    {/*     <Grid><br /></Grid> */}
                    <Box sx={{ display: 'flex', borderRadius: '12px', bgcolor: '#BEDFEB', color: '#050A30', p: .5 }}>
                        <InfoIcon sx={{ color: '#5DB6CE' }} fontSize='large' />&nbsp;
                        <div style={{ justifyContent: 'space-evenly' }} >
                            <span className='infodiv2' color='#5DB6CE'>All information about this transaction will be sent to </span><span className='infodiv' color='#2D3748'>jhon.maxwell@gmail.com.</span><span className='infodiv2' color='#5DB6CE'> Check to make sure your email is correct.</span>
                        </div>

                    </Box>

                    <div>
                        <br />
                        <Button sx={{ borderRadius: '1ch', bgcolor: '#5DB6CE', p: 1 }} fullWidth variant="contained">CONFIRM</Button>
                    </div>


                </Grid>
            </Grid >

        </Box >
        

    )
}

export default BookingDetails