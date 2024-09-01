"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const fs = __importStar(require("node:fs"));
class storage {
    constructor(file) {
        this.file = file;
    }
    ;
    getData() {
        try {
            this.stringdata = fs.readFileSync(this.file, 'utf8'); // 将读取的内容存储到变量中
            this.data = JSON.parse(this.stringdata);
            console.log('File content:', this.data); // 在这里可以使用 fileContent 变量
            return this.data;
        }
        catch (err) {
            console.error('Error reading file:', err);
            return;
        }
        ;
    }
    ;
    formatData() {
        this.data_formated = this.data;
    }
    ;
    writeData(key, value) {
        this.formatData;
        this.data_formated[key] = value;
    }
}
exports.default = storage;
