import React, { useEffect, useState } from 'react'
import { Calendar, Badge } from 'antd'
import { containerx } from '../../styles'
import crud from '../api/crud';
import moment from 'moment';
import '../../MonthView.css'



function MonthView(props) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        /*   let interval */
        const fetchData = async () => {
            const result = await crud.get('/post');

            setEvents(result.data);
        };
        fetchData();
        /* interval = setInterval(() => {

            fetchData()

        }, 2.5 * 1000)

        return () => {

            clearInterval(interval)

        } */
    }, []);
    function generateRandomColor(event) {
        /*      var letters = '0123456789ABCDEF';
         var randomColor = '#';
         for (var i = 0; i < 3; i++) {
             randomColor += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
         }
         const color = randomColor === '#ffffff' ? generateRandomColor() : randomColor;
         return color; */
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
        props.week(e)

    }

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
        <Calendar mode='month' dateCellRender={dateCellRender} style={containerx} onChange={change}>

        </Calendar>
    )
}


export default MonthView
