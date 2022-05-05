import moment from 'moment';


export const getAllDaysInTheWeek = (currentDate = moment()) => {
    const weekStart = currentDate.clone().startOf('week');

    const days = Array.from(Array(7))
        .map((day, index) => index)
        .map(day =>
            moment(weekStart).add(day, 'days').set('minutes', 0).set('seconds', 0)
        )
        .map(momentObj => ({
            date: momentObj.date(),
            dateStamp: +momentObj,
            weekDayName: momentObj.format('ddd'),
        }));

    return days;
};

// All the hours in the day
export const times = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
];



export const generateWeekViewCoordinates = (event, startDate) => {

    const start = moment(JSON.parse(event.start));
    const end = moment(JSON.parse(event.end));
    const duration = moment.duration(end.diff(start));
    const weekStart = moment(startDate);

    // Calculating Top
    /*   const top = start.minutes() === 30 ? '50' : '0'; */
    /*   console.log(top) */
    // Calculating height
    const timeFactor = duration.hours() + duration.minutes() / 60;
    let height
    let left, width;
    const days = duration._data.days

    if (weekStart.week() === start.week()) {
        const weekDay = start.weekday();
        left = (weekDay + 1) * 12.5;

    }

    if (weekStart.week() === start.week() && weekStart.week() === end.week()) {
        const daysDiff = duration.days();
        width = (daysDiff + 1) * 12.5 /* - 2 */;
    }

    /*    console.log(weekStart.week(), 'tp', start.week(), end.week()) */
    if (weekStart.week() > start.week() && weekStart.week() === end.week()) {
        const daysDiff = moment.duration(
            end.diff(
                weekStart
                    .startOf('week')
                    .set('hours', start.hours())
                    .set('minutes', start.minutes())
            )
        )
            .days();
        width = (daysDiff + 1) * 12.5 /* - 2 */;
    }


    if (weekStart.week() > start.week()) {
        left = 12.5;
    }

    if (weekStart.week() < end.week()) {
        width = 100 - left;
    }

    if (days === 0) {
        height = timeFactor * 100;
    }
    else if (days >= 1) {
        height = 24 * 100
        width = 12.5 * days

    }



    return {
        /* top: top + '%', */
        left: left + '%',
        height: height + '%',
        width: width + '%',
    };

};

export const generateWeekViewCoordinatess = (event, startDate) => {

    const start = moment(JSON.parse(event.start));
    const end = moment(JSON.parse(event.end));
    const duration = moment.duration(end.diff(start));
    const weekStart = moment(startDate);

    // Calculating Top
    /*   const top = start.minutes() === 30 ? '50' : '0'; */
    /*   console.log(top) */
    // Calculating height
    const timeFactor = duration.hours() + duration.minutes() / 60;
    let height
    let left, width;
    const days = duration._data.days


    if (weekStart.week() === start.week()) {
        const weekDay = start.weekday();
        left = (weekDay + 1) * 12.5 + 12.5 * days;

    }

    if (weekStart.week() === start.week() && weekStart.week() === end.week()) {
        const daysDiff = duration.days();
        width = (daysDiff + 1) * 12.5 /* - 2 */;
    }

    /*    console.log(weekStart.week(), 'tp', start.week(), end.week()) */
    if (weekStart.week() > start.week() && weekStart.week() === end.week()) {
        const daysDiff = moment.duration(
            end.diff(
                weekStart
                    .startOf('week')
                    .set('hours', start.hours())
                    .set('minutes', start.minutes())
            )
        )
            .days();
        width = (daysDiff + 1) * 12.5 /* - 2 */;
    }

    /* 
    
        if (weekStart.week() > start.week()) {
            left = 12.5;
        }
    
        if (weekStart.week() < end.week()) {
            width = 100 - left;
        }
    
        if (days === 0) {
            height = timeFactor * 100;
        }
        else if (days >= 1) {
            height = 24 * 100
            width = 12.5 * 2
            left = 12.5 * timeFactor / 2
        }
     */

    height = timeFactor * 100
    width = 12.5

    return {
        /* top: top + '%', */
        left: left + '%',
        height: height + '%',
        width: width + '%',
    };

};
export const isTodaysDate = dateStamp => {
    const today = moment();
    dateStamp = moment(dateStamp);
    return (
        moment.duration(dateStamp.diff(today)).days() === 0 &&
        today.day() === dateStamp.day()
    );
};