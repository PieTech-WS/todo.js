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
import * as fs from 'fs';
import * as path from 'path';

export default class JSONFileHandler<T> {
    private filePath: string;

    constructor(filePath: string) {
        // 在桌面环境下，使用 Node.js 的路径解析
        this.filePath = path.resolve(filePath);
    }

    // 使用 require 同步读取 JSON 文件
    public readJSONSync(): T {
        // 确保文件未被缓存
        delete require.cache[require.resolve(this.filePath)];
        const data: T = require(this.filePath);
        return data;
    }

    // 使用 fs 模块异步读取 JSON 文件
    public async readJSON(): Promise<T> {
        const fileContent = await fs.promises.readFile(this.filePath, 'utf8');
        return JSON.parse(fileContent) as T;
    }

    // 使用 fs 模块同步写入 JSON 文件
    public writeJSONSync(data: T): void {
        const jsonString = JSON.stringify(data, null, 4); // 格式化 JSON 字符串
        fs.writeFileSync(this.filePath, jsonString, 'utf8');
    }

    // 使用 fs 模块异步写入 JSON 文件
    public async writeJSON(data: T): Promise<void> {
        const jsonString = JSON.stringify(data, null, 4); // 格式化 JSON 字符串
        await fs.promises.writeFile(this.filePath, jsonString, 'utf8');
    }
}
