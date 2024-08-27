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
import { todo, todoList, date, time } from './Types'

const todo_not_found_err = new Error('Get todo by id error: Not Found')

class Storage{
    data!: todoList;
    stringdata!: string;
    todo_!: todo;
    load() {
        try {
            this.stringdata = fs.readFileSync('../content.txt', 'utf8'); // 将读取的内容存储到变量中
            console.log('File content:', this.data); // 在这里可以使用 fileContent 变量
        } catch (err) {
            console.error('Error reading file:', err);
        };
        this.data = JSON.parse(this.stringdata) as todoList;
    };
    getTodoById(id: string) {
        this.todo_ = this.data[id];
        if (this.todo_ == undefined){
            throw todo_not_found_err
        }
        return this.todo_;
    };
    storageTodo(id: string, todo__: todo) {
        this.data[id] = todo__
    }    
}
class TodoManage{
    createTodo(date_: date, time_: ){

    }
}