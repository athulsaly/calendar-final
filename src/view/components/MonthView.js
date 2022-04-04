import React, { useEffect, useState } from 'react'
import { Calendar, Badge } from 'antd'
import { containerx } from '../../styles'
import crud from '../api/crud';
import moment from 'moment';
import '../../MonthView.css'



function MonthView(props) {
    const [events, setEvents] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            const result = await crud.get('/post');

            setEvents(result.data);
        };
        fetchData();

    }, []);

    function generateRandomColor(event) {

        if (event.status === 'Created')
            return '#FF8F00'
        else if (event.status === 'Pending')
            return '#787C87'
        else if (event.status === 'Confirmed')
            return '#29D6D0'
        else if (event.status === 'Canceled')
            return '#FF0009'
        else if (event.status === 'Completed')
            return '#00FF39'
        else
            return '#c90bf4'
    }
    function getListData(value) {
        let listData = [];
        let dateValue = value.format("yyyy/MM/DD");

        events.forEach(booking => {
            if (dateValue === moment(booking.start).format("YYYY/MM/DD")) {
                listData.push({
                    status: generateRandomColor(booking),
                    content: booking.title,

                });
            }
        });


        return listData;
    }
    function change(e) {
        /*     let select = e.format().slice(0, 7)
            let current = moment(+moment()).format('YYYY-MM') */

        /*   if (select === current.toString()) { */
        props.week(e)
        /*   } */
    }


    const handleSubmit = (event) => {
        event.preventDefault();

    };

    const dateCellRender = value => {
        const listData = getListData(value);
        return (
            <ul className='events'>
                {listData.map((item, index) => (
                    <li key={`${item.content}-${index}`}>
                        <Badge color={item.status} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };


    return (
        <Calendar mode='month' dateCellRender={dateCellRender} style={containerx} onPanelChange={handleSubmit} onSelect={change}>

        </Calendar>
    )
}


export default MonthView
