import JSONFileHandler from '../platform/desktop/StorageLib';
import { todo, todoStorage } from '../platform/desktop/Interfaces';

export class TodoStore {
    private fileHandler: JSONFileHandler<todoStorage>;
    private data: todoStorage;

    constructor(filePath: string) {
        this.fileHandler = new JSONFileHandler<todoStorage>(filePath);
        this.data = this.loadTodos(); // 初始化时加载待办事项
    }

    // 加载待办事项
    private loadTodos(): todoStorage {
        try {
            return this.fileHandler.readJSONSync(); // 从文件同步加载
        } catch (error) {
            // 如果文件不存在或者加载失败，返回一个默认的空存储结构
            return {
                usedID: [],
                todo: {}
            };
        }
    }

    // 根据 ID 获取待办事项
    public getTodoById(id: string): todo | undefined {
        return this.data.todo[id.toString()];
    }

    // 添加新待办事项
    public addTodo(newTodo: todo): string {
        const newId = this.generateNewId();
        this.data.todo[newId.toString()] = newTodo;
        this.data.usedID.push(newId);
        this.saveTodos(); // 保存到文件
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
    public completeTodo(id: string): boolean {
        if (this.data.todo[id]) {
            this.data.todo[id].completed = true;
            this.saveTodos();
            return true;
        }
        return false;
    }

    // 保存待办事项
    private saveTodos(): void {
        this.fileHandler.writeJSONSync(this.data);
    }
}