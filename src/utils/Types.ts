export interface time{
    hour: number,
    minute: number
}
export interface date{
    year: number,
    month: number,
    date: number
}

export interface todo{
    name: string,
    alert_time: time,
    alert_date: date|undefined,
    recurring_reminders_enabled: boolean,
    recurring_reminders: string|undefined,
    priority: number,
    place: string
}

export interface todoList{
    [id: string]: todo
}