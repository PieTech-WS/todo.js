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
import * as fs from 'node:fs'

export default class storage{
    file!: string;
    data!: JSON;
    stringdata!: string;
    data_formated: any;
    constructor(file: string){
        this.file = file
    };
    getData(){
        try {
            this.stringdata = fs.readFileSync(this.file, 'utf8'); // 将读取的内容存储到变量中
            this.data = JSON.parse(this.stringdata)
            console.log('File content:', this.data); // 在这里可以使用 fileContent 变量
            return this.data;
        } catch (err) {
            console.error('Error reading file:', err);
            return;
        };
    };
    formatData<Type>(){
        this.data_formated = this.data as Type;
    };
    writeData<Type>(key: string, value: string){
        this.formatData<Type>;
        this.data_formated[key] = value
    }
}