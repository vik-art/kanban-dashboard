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

  addTask(task: any): Observable<TaskItem> {
    return this.http.post<TaskResponse>(`${environment.dbUrl}/tasks.json`, task)
    .pipe(
      map(res => {
        return {
          ...task,
          id: res.name
        }
      })
    )
    }

  update(task: TaskItem): Observable<TaskItem> {
    return this.http.patch<TaskItem>(`${environment.dbUrl}/tasks/${task.id}.json`, task)
  }

  getAll(): Observable<TaskItem[] | null> {
    return this.http.get<any>(`${environment.dbUrl}/tasks.json`)
    .pipe(
      map(res => {
        if(res) {
       return Object
       .keys(res)
       .map(el => {
         return {
           ...res[el],
           id: el
         }
       })
      } else {
        return null
      }
      })
    )
    }

    delete(task: TaskItem): Observable<void> {
     return this.http.delete<void>(`${environment.dbUrl}/tasks/${task.id}.json`)
    }
}
