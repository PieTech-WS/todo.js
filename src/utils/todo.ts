/*
   Copyright 2024 PowerAtom OpenSource

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import * as fs from 'node:fs';
import { todo, todoList, date, time, todoStorage, fileContent } from './Types'
import storagelib from './StorageLib'

const todo_not_found_err = new Error('Get todo by id error: Not Found')

class todoStorageTool{
    todoStorage1!: todoStorage;
    stringdata!: string;
    todo_!: todo;
    Storage1!: storagelib;
    load() {
        this.Storage1 = new storagelib('./content.txt')
        this.Storage1.formatData<fileContent>();
        this.todoStorage1 = this.Storage1.data_formated['todoStorage'] as todoStorage;
    };
    getTodoById(id: string) {
        this.todo_ = this.todoStorage1.todo[id];
        if (this.todo_ == undefined){
            throw todo_not_found_err
        }
        return this.todo_;
    };
    storageTodo(id: string, todo__: todo) {
        this.todoStorage1.todo[id] = todo__
    }    
}
class TodoManage{
    createTodo(time_: time, name: string, recurring_reminders_enabled: boolean, priority: number, date_?: date, recurring_reminders?: string){
        const newtodo: todo = {
            name: name,
            alert_time: time_,
            alert_date: date_,
            recurring_reminders_enabled: recurring_reminders_enabled,
            priority: priority
        }
    }
}