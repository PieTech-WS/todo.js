"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const todoStorage_1 = require("./todoStorage");
const todoStore = new todoStorage_1.TodoStore('./storage/todo.json');
// 添加新待办事项
const newTodo = {
    name: "Walk the dog",
    alert_time: { hour: 7, minute: 30 },
    recurring_reminders_enabled: true,
    recurring_reminders: "daily",
    priority: 2,
    completed: false
};
const newId = todoStore.addTodo(newTodo);
console.log(`新待办事项的 ID: ${newId}`);
// 根据 ID 获取待办事项
const fetchedTodo = todoStore.getTodoById(newId);
console.log('获取的待办事项:', fetchedTodo);
