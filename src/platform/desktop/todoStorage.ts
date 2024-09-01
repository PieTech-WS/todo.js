import JSONFileHandler from './StorageLib';
import { todo, todoStorage } from './Types';

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
    public getTodoById(id: number): todo | undefined {
        return this.data.todo[id.toString()];
    }

    // 添加新待办事项
    public addTodo(newTodo: todo): number {
        const newId = this.generateNewId();
        this.data.todo[newId.toString()] = newTodo;
        this.data.usedID.push(newId);
        this.saveTodos(); // 保存到文件
        return newId;
    }

    // 生成一个新的 ID
    private generateNewId(): number {
        const lastId = this.data.usedID.length > 0
            ? Math.max(...this.data.usedID)
            : 0;
        return lastId + 1;
    }

    // 保存待办事项
    private saveTodos(): void {
        this.fileHandler.writeJSONSync(this.data);
    }
}