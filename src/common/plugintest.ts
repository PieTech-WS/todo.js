import { Time } from './utils';
import { date, time } from './Interfaces';
const TimeUtil = new Time()
const date1: date = {
    year: 2024,
    month: 9,
    date:3
}
const time1: time = {
    hour:9,
    minute:18
}
console.log(TimeUtil.formatTime("MM/DD HH:mm", date1, time1))