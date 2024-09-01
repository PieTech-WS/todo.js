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

export class JSONFileHandler {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = path.resolve(filePath);
    }

    // 读取 JSON 文件
    public readJSON(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError);
                }
            });
        });
    }

    // 写入 JSON 文件
    public writeJSON(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const jsonString = JSON.stringify(data, null, 4);
            fs.writeFile(this.filePath, jsonString, 'utf8', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
