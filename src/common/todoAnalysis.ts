import { time, date, todo, todoStorage } from "./Interfaces";

type RecurringType = 'daily' | 'weekly' | 'monthly' | 'yearly';

const getCurrentDateTime = () => {
    const now = new Date();
    return {
        currentDate: {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            date: now.getDate(),
        },
        currentTime: {
            hour: now.getHours(),
            minute: now.getMinutes(),
        }
    };
};

const isRecurringMatch = (currentDate: date, todoItem: todo): boolean => {
    if (!todoItem.recurring_reminders_enabled || !todoItem.recurring_reminders) {
        return false;
    }

    const recurringType = todoItem.recurring_reminders as RecurringType;

    switch (recurringType) {
        case 'daily':
            return true; // 每天匹配
        case 'weekly':
            const todoDate = new Date(todoItem.alert_date!.year, todoItem.alert_date!.month - 1, todoItem.alert_date!.date);
            const currentDateObj = new Date(currentDate.year, currentDate.month - 1, currentDate.date);
            return todoDate.getDay() === currentDateObj.getDay(); // 每周同一天匹配
        case 'monthly':
            return todoItem.alert_date!.date === currentDate.date; // 每月同一天匹配
        case 'yearly':
            return todoItem.alert_date!.month === currentDate.month && todoItem.alert_date!.date === currentDate.date; // 每年同一天匹配
        default:
            return false;
    }
};

const isTimeBefore = (time1: time, time2: time): boolean => {
    return time1.hour < time2.hour || (time1.hour === time2.hour && time1.minute < time2.minute);
};

const isDateBefore = (date1: date, date2: date): boolean => {
    return date1.year < date2.year ||
        (date1.year === date2.year && date1.month < date2.month) ||
        (date1.year === date2.year && date1.month === date2.month && date1.date < date2.date);
};

export class TodoAnalyzer {
    constructor(private storage: todoStorage) {}

    getUpcomingTodosWithin(timeLengthInMinutes: number): todo[] {
        const { currentDate, currentTime } = getCurrentDateTime();
        const upcomingTodos: todo[] = [];
    
        Object.values(this.storage.todo).forEach(todoItem => {
            const isSameDay = todoItem.alert_date &&
                              !isDateBefore(todoItem.alert_date, currentDate) &&
                              !isDateBefore(currentDate, todoItem.alert_date);
    
            const isRecurringToday = isRecurringMatch(currentDate, todoItem);
    
            if (isSameDay || isRecurringToday) {
                const timeDifference = (todoItem.alert_time.hour - currentTime.hour) * 60 +
                                       (todoItem.alert_time.minute - currentTime.minute);
                if (timeDifference > 0 && timeDifference <= timeLengthInMinutes) {
                    upcomingTodos.push(todoItem);
                }
            }
        });
    
        return upcomingTodos.sort((a, b) => {
            const timeA = a.alert_time.hour * 60 + a.alert_time.minute;
            const timeB = b.alert_time.hour * 60 + b.alert_time.minute;
            return timeA - timeB;
        });
    }
    
    getMissedTodos(): todo[] {
        const { currentDate, currentTime } = getCurrentDateTime();
        const missedTodos: todo[] = [];
    
        Object.values(this.storage.todo).forEach(todoItem => {
            const isPastDate = todoItem.alert_date && isDateBefore(todoItem.alert_date, currentDate);
            const isPastTime = todoItem.alert_date &&
                               !isDateBefore(currentDate, todoItem.alert_date) &&
                               isTimeBefore(todoItem.alert_time, currentTime);
            const isRecurringMissed = isRecurringMatch(currentDate, todoItem) && isTimeBefore(todoItem.alert_time, currentTime);
    
            if (isPastDate || isPastTime || isRecurringMissed) {
                missedTodos.push(todoItem);
            }
        });
    
        return missedTodos;
    }
}
