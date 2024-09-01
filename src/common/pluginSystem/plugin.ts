import { Plugin } from './pluginInterface';
import * as fs from 'fs';
import * as path from 'path';

export class PluginLoader {
    private plugins: Plugin[] = [];

    // 加载插件并调用初始化钩子
    public loadPluginsFromDirectory(directory: string): void {
        const pluginFiles = fs.readdirSync(directory);

        pluginFiles.forEach(file => {
            const pluginPath = path.resolve(directory, file);
            const pluginModule = require(pluginPath);
            const plugin: Plugin = new pluginModule.default();

            this.registerPlugin(plugin);
        });
    }

    // 注册插件并调用 onInit 钩子
    public registerPlugin(plugin: Plugin): void {
        console.log(`注册插件: ${plugin.name}`);
        this.plugins.push(plugin);

        if (plugin.onInit) {
            plugin.onInit(); // 调用初始化钩子
        }
    }

    // 卸载所有插件并调用 onDestroy 钩子
    public unloadPlugins(): void {
        this.plugins.forEach(plugin => {
            if (plugin.onDestroy) {
                plugin.onDestroy(); // 调用清理钩子
            }
        });

        this.plugins = [];
    }

    // 执行所有插件
    public executePlugins(data: any): void {
        this.plugins.forEach(plugin => plugin.execute(data));
    }
}
