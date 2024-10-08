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

/*
import config from '../../config/config.json';


class demo{
    private newTodoID!: string | null;
    async main() {
        const todoStore = new TodoStore('./storage/todo.json');
        await todoStore.loadTodos()
        // 添加新待办事项
        const newTodo: todo = {
            name: "Walk the dog",
            alert_time: { hour: 7, minute: 30 },
            recurring_reminders_enabled: true,
            recurring_reminders: "daily",
            priority: 2,
            completed: false
        };

        this.newTodoID = await todoStore.addTodo(newTodo)
        if (this.newTodoID) {
            console.log(`新待办已创建, ID 为: ${this.newTodoID}`);
        } else {
            console.log("无法创建待办事项");
            return;
        }

        // 根据 ID 获取待办事项
        const fetchedTodo = todoStore.getTodoById(this.newTodoID);
        console.log('获取的待办事项:', fetchedTodo);
    }
}


import { TodoStore } from './todoStorage';
import { todo } from '../platform/desktop/Interfaces';
import { PluginLoader } from './pluginSystem/plugin';

const pluginLoader = new PluginLoader();

pluginLoader.loadPluginsFromDirectory('./src/internal_plugins', 'desktop');

const dem = new demo()
dem.main()
*/
import { ConfigManager } from "../platform/desktop/configlib";
class TodoManager{
    ConfigMana = new ConfigManager('./config/config.json');
    todoStoragePath: string;
    constructor() {
        this.todoStoragePath = this.ConfigMana.getValue('storage.todo')
    };
    
}