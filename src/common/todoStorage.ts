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
import JSONFileHandler from '../platform/desktop/StorageLib';
import { todo, todoStorage } from '../platform/desktop/Interfaces';

export class TodoStore {
    private fileHandler: JSONFileHandler<todoStorage>;
    private data: todoStorage | null = null;

    constructor(filePath: string) {
        this.fileHandler = new JSONFileHandler<todoStorage>(filePath);

    }

    // 异步加载待办事项
    public async loadTodos(): Promise<void> {
        try {
            this.data = await this.fileHandler.readJSON(); // 从文件异步加载
        } catch (error) {
            // 如果文件不存在或者加载失败，初始化一个默认的空存储结构
            this.data = {
                usedID: [],
                todo: {}
            };
        }
        console.log(this.data)
    }

    // 根据 ID 获取待办事项
    public getTodoById(id: string | null): todo | undefined {
        if (!this.data) return undefined;
        if (id != null) return this.data.todo[id];
        return;
    }

    // 添加新待办事项
    public async addTodo(newTodo: todo): Promise<string | null> {
        if (!this.data) return null;

        const newId = this.generateNewId();
        this.data.todo[newId] = newTodo;
        this.data.usedID.push(newId);
        await this.saveTodos(); // 异步保存到文件
        return newId;
    }

    // 生成一个新的 ID
    private generateNewId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    // 完成待办事项
    public async completeTodo(id: string): Promise<boolean> {
        if (!this.data || !this.data.todo[id]) {
            return false;
        }
        
        this.data.todo[id].completed = true;
        await this.saveTodos();
        return true;
    }

    // 异步保存待办事项
    private async saveTodos(): Promise<void> {
        if (this.data) {
            await this.fileHandler.writeJSON(this.data);
        }
    }
}
