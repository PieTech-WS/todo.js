"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoManage = void 0;
const StorageLib_1 = __importDefault(require("../platform/desktop/StorageLib"));
const todo_not_found_err = new Error('Get todo by id error: Not Found');
class todoStorageTool {
    load() {
        this.Storage1 = new StorageLib_1.default('./src/utils/content.txt');
        this.Storage1.getData();
        this.Storage1.formatData();
        this.todoStorage1 = this.Storage1.data_formated['todoStorage'];
    }
    ;
    getTodoById(id) {
        this.todo_ = this.todoStorage1.todo[id];
        if (this.todo_ == undefined) {
            throw todo_not_found_err;
        }
        return this.todo_;
    }
    ;
    storageTodo(id, todo__) {
        this.todoStorage1.todo[id] = todo__;
    }
    ;
    saveTodoList() {
    }
}
class TodoManage {
    init_Manager() {
        this.todoStoragetool_ = new todoStorageTool;
        this.todoStoragetool_.load();
    }
    ;
    createTodo(time_, name, recurring_reminders_enabled, priority, date_, recurring_reminders) {
        const newtodo = {
            name: name,
            alert_time: time_,
            alert_date: date_,
            recurring_reminders_enabled: recurring_reminders_enabled,
            priority: priority
        };
        this.todoStoragetool_.storageTodo('1', newtodo);
        console.log(this.todoStoragetool_.todoStorage1);
    }
}
exports.TodoManage = TodoManage;
