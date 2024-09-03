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
import { date, time } from './Interfaces'

export class Time{
    formatTime(format: string = 'YYYY/MM/DD hh:mm', date:date, time:time) {
        const map: { [key: string]: string } = {
            'YYYY': date.year.toString(),
            'MM': ('0' + date.month.toString()).slice(-2),
            'DD': ('0' + date.date).slice(-2),
            'HH': ('0' + time.hour).slice(-2),
            'mm': ('0' + time.minute).slice(-2)
        };

        return format.replace(/YYYY|MM|DD|HH|mm/g, (matched) => map[matched]);
    };
}