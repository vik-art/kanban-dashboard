import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from 'src/app/components/form/form.component';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from '../../common/interfaces/task';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
    task!: string;
    type!: string;

  todo = [
    {
    value: 'Planned',
    disabled: true,
    id: "todo"
  }];

  done = [
    {
      value: 'In progress',
      disabled: true,
      id: "progress"
    }
    ];

  finishedTodo = [
    {
      value: "Finished tasks",
      disabled: true,
      id: "finished"
    }
  ]

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe(res => {
      res?.map((el) => {
        if(el['type'] === "planned") {
          this.todo = [
            ...this.todo,
           {
            value: el['value'],
            disabled: el['disabled'],
            id: el.id
           }
          ]
        }
      })
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '550px',
      data: {
        task: this.task
      }
    });

    dialogRef.afterClosed().subscribe(result => {  
      this.task = result.task;
      const newTask = {
        value: this.task,
        disabled: false,
        type: "planned"
      }
      this.taskService.addTask(newTask).subscribe((res) => {
        this.todo.push(res);
        this.task = "";
      })
    });
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let type = "planned";
      event.container.data.map(el => {
        if(el.id === "progress" || el.id === "finished") {
          type = el.id;
        } else {
          const task = {
            ...el,
            type
          }
          this.taskService.update(task).subscribe(() => {})
        }
      })
      
    }
  }

}
