import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './BookingDetails.css'
import Divider from '@mui/material/Divider';
import InfoIcon from '@mui/icons-material/Info';
/* import axios from 'axios'; */
import { /* useEffect, */ useState } from 'react';
import moment from 'moment';
import { NoBackpackSharp } from '@mui/icons-material';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

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



    const startx = events.start === undefined ? '0' : events.start
    const endx = events.end === undefined ? '0' : events.end

    const total_days = moment(JSON.parse(endx)).format('d') - moment(JSON.parse(startx)).format('d') === 0 ? '1' : moment(JSON.parse(endx)).format('d') - moment(JSON.parse(startx)).format('d') + 1
    /* const tot_days = moment(moment(JSON.parse(startx)).diff(moment(JSON.parse(endx)))).format('DD') */
    const total = events.total_fee * total_days
    const service_fee = parseFloat(total * .133).toFixed(2)
    const final = parseFloat(total) + parseFloat(service_fee)
    return (
        < Box sx={{ width: 'auto' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Grid>
                        <h2 style={{ float: 'left' }} className='heading2'>Booking Details</h2>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item>
                            <Img sx={{ boxShadow: 1, width: 250, height: 150, borderRadius: 2 }} alt="complex" src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1568&q=80" />
                        </Grid>

                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6" component="div">
                                    <b className='heading1'>{events.title}</b>
                                </Typography>
                                <div style={{ display: "flex", alignItems: 'flex-start' }}>
                                    <LocationOnIcon /> &nbsp;
                                    <Typography style={{ width: 'auto' }} className='title2'>
                                        5832 Georgia Ave NW, Washington, Washington, D.C, DC 20011, USA
                                    </Typography>
                                </div>
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
                                <p className='title2'>{moment(JSON.parse(startx)).format('Do MMM YYYY')}</p>
                                <p className='titlex'>First Name</p>
                                <p className='title2'>John</p>
                                <p className='titlex'>Phone Number</p>
                                <p className='title2'>+45 436 785 545</p>

                            </Grid>
                            <Grid item xs={8}>
                                <p className='titlex'>To</p>
                                <p className='title2'>{moment(JSON.parse(endx)).format('Do MMM YYYY')}</p>
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
                                <p className='heading3'>${events.total_fee} x {total_days} {total_days === '1' ? 'Day' : 'Days'}</p>
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
                    <Grid>
                        <h2 style={{ float: 'left' }} className='heading2'>Payment</h2>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item style={{ display: 'inline-flex' }}>
                            <p className='heading3' style={{ color: '#5DB6CE' }}>${final.toFixed(2)}</p>&nbsp;<p className='heading3' style={{ color: '#7A7A7A' }}>/ {total_days} {total_days === '1' ? 'Day' : 'Days'}</p>
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
                        />
                        <p className='title3' >Last Name</p>
                        <TextField
                            fullWidth
                            id="last-name"
                            className='inputRounded'
                        />
                        <p className='title3' >Card Number</p>
                        <TextField
                            fullWidth
                            id="card-number"
                            className='inputRounded'
                            variant="outlined"
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