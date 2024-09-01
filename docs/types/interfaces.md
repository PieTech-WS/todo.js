# Todo.js自定义接口

[查看代码](../../src/platform/desktop/Interfaces.ts)(Desktop) [查看代码](../../src/platform/vela/Interfaces.ts)(vela)

## todo

```ts
export interface todo{
    name: string,
    alert_time: time,
    alert_date?: date,
    recurring_reminders_enabled: boolean,
    recurring_reminders?: string,
    priority: number,
    place?: string,
    completed: boolean;
}
```

### name[string]

待办名称

### alert_time[[time](#time)]

提醒时间(时 分)

### alert_date[[date](#date)] (可选)

提醒日期

## time

```ts
export interface time{
    hour: number,
    minute: number
}
```

### hour[number]

小时

### minute[number]

分钟

## date

```ts
export interface date{
    year: number,
    month: number,
    date: number
}
```

### year[number]

年份(四位数字)

### month[number]

月份

### date[number]

日期

## todoList

```ts
export interface todoList{
    [id: string]: todo
}
```

### key:id[string]

索引值, 为待办的ID

### value[[todo](#todo)]

待办

## todoStorage

```ts
export interface todoStorage{
    usedID: Array<number>,
    todo: todoList
}
```

### usedID[Array `<number>`]

已使用的待办ID
