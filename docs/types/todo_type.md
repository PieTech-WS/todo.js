# Todo.js自定义类型
[查看代码](../../src/utils/Types.ts)
## todo
```ts
export interface todo{
    name: string,
    alert_time: time,
    alert_date?: date,
    recurring_reminders_enabled: boolean,
    recurring_reminders?: string,
    priority: number,
    place?: string
}
```
### name[string]
待办名称
### alert_time[[time](#time)]
提醒时间(时 分)
### alert_date[[date](#date)] (可选)
提醒日期