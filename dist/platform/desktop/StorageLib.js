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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class JSONFileHandler {
    constructor(filePath) {
        this.filePath = path.resolve(filePath);
    }
    // 使用 require 同步读取 JSON 文件
    readJSONSync() {
        // 确保文件未被缓存
        delete require.cache[require.resolve(this.filePath)];
        const data = require(this.filePath);
        return data;
    }
    // 使用 fs 模块异步读取 JSON 文件
    async readJSON() {
        const fileContent = await fs.promises.readFile(this.filePath, 'utf8');
        return JSON.parse(fileContent);
    }
    // 使用 fs 模块同步写入 JSON 文件
    writeJSONSync(data) {
        const jsonString = JSON.stringify(data, null, 4); // 格式化 JSON 字符串
        fs.writeFileSync(this.filePath, jsonString, 'utf8');
    }
    // 使用 fs 模块异步写入 JSON 文件
    async writeJSON(data) {
        const jsonString = JSON.stringify(data, null, 4); // 格式化 JSON 字符串
        await fs.promises.writeFile(this.filePath, jsonString, 'utf8');
    }
}
exports.default = JSONFileHandler;
