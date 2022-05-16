import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskResponse } from '../common/interfaces/response';
import { TaskItem } from '../common/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${environment.dbUrl}/tasks.json`, task)
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.dbUrl}/tasks.json`)
    .pipe(
      map(res => {
       return Object
       .keys(res)
       .map(el => {
         return {
           ...res[el]
         }
       })
      })
    )
    }
}
