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

export class ConfigManager {
    private configFilePath: string;
    private configData: Record<string, any>;

    constructor(configFilePath: string) {
        this.configFilePath = path.resolve(configFilePath);
        this.configData = this.loadConfig();
    }

    // 加载配置文件
    private loadConfig(): Record<string, any> {
        try {
            const fileContent = fs.readFileSync(this.configFilePath, 'utf8');
            return JSON.parse(fileContent);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`无法加载配置文件: ${error.message}`);
            } else {
                console.error("Unknown error:", error);
            }
            return {};
        }
    }

    // 获取指定 key 的值，支持嵌套键
    public getValue(key: string): any {
        const keys = key.split('.'); // 将嵌套键通过 '.' 分割成数组
        let result = this.configData;

        for (const k of keys) {
            if (result[k] === undefined) {
                return undefined; // 如果路径中某个键不存在，返回 undefined
            }
            result = result[k]; // 继续深入对象
        }

        return result;
    }

    // 设置指定 key 的值，支持嵌套键
    public setValue(key: string, value: any): void {
        const keys = key.split('.'); // 将嵌套键通过 '.' 分割成数组
        let result = this.configData;

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!result[k]) {
                result[k] = {}; // 如果路径中某个键不存在，创建它
            }
            result = result[k]; // 继续深入对象
        }

        // 设置最终的值
        result[keys[keys.length - 1]] = value;
        this.saveConfig(); // 保存更改到文件
    }

    // 保存配置数据到文件
    private saveConfig(): void {
        try {
            const jsonString = JSON.stringify(this.configData, null, 4); // 格式化 JSON
            fs.writeFileSync(this.configFilePath, jsonString, 'utf8');
        } catch (error) {
            if (error instanceof Error) {
                console.error(`无法保存配置文件: ${error.message}`);
            } else {
                console.error("Unknown error:", error);
            }
        }
    }
}
