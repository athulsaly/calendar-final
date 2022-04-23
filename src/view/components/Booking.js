import './Booking.css'
import BookingDetails from './BookingDetails';
import Dialog from '@mui/material/Dialog';
function Booking(props) {
    return (
        <Dialog fullScreen open={props.open} onClose={props.onClose}>
            <div className='Booking'>
                <BookingDetails event={props.event} onClose={props.onClose} />
            </div >
        </Dialog >
    );
}

export default Booking;
