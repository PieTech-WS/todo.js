export interface Plugin {
    name: string;
    execute(data: any): void;
    onInit?(): void;
    onDestroy?(): void;
};
export interface PluginConfig {
    name: {
        [language: string]: string;
    };
    package: string;
    author: string;
    version: string;
    platform: string[];
    main: string;
}
