export interface Plugin {
    name: string;
    execute(data: any): void;
    onInit?(): void;
    onDestroy?(): void;
}