import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskItem } from '../common/interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  addTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${environment.dbUrl}/tasks/planned.json`, task)
  }
}
