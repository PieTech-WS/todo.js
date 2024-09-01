"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = require("./todo");
const tm = new todo_1.TodoManage;
tm.init_Manager();
const Time = {
    hour: 9,
    minute: 18
};
const Date = {
    year: 2024,
    month: 8,
    date: 31
};
tm.createTodo(Time, 'todotest', false, 3, Date);
