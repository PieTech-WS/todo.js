import { Plugin } from '../../../../common/pluginSystem/pluginInterface';

export default class day_view implements Plugin {
    name = "LogPlugin";

    // 插件初始化时执行
    onInit(): void {
        console.log(`${this.name} 插件初始化`);
    }

    // 插件卸载时执行
    onDestroy(): void {
        console.log(`${this.name} 插件已卸载`);
    }

    // 插件执行的主要逻辑
    execute(data: any): void {
        console.log(`${this.name} 正在处理数据:`, data);
    }
}
