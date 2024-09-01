import { TodoManage } from './todo';
import { time, date } from '../platform/desktop/Types'
const tm = new TodoManage;
tm.init_Manager();
const Time: time = {
    hour: 9,
    minute: 18
}
const Date: date = {
    year: 2024,
    month: 8,
    date: 31
}
tm.createTodo(
    Time,
    'todotest',
    false,
    3,
    Date
)