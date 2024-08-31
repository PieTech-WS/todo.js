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
import { todoManage } from './dist/todo';
import { time, date } from './dist/Types'
tm = new todoManage;
tm.init_manager();
time = new time;
time.hour = 9;
time.minute = 18;
date = new date;
date.year = 2024;
date.month = 8;
date.date = 31;
tm.createTodo(
    time,
    'todotest',
    false,
    3,
    date
)