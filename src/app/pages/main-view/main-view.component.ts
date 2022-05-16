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
    disabled: true
  }];

  done = [
    {
      value: 'In progress',
      disabled: true
    }
    ];

  finishedTodo = [
    {
      value: "Finished tasks",
      disabled: true
    }
  ]

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
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
      const newTask: TaskItem = {
        value: this.task,
        disabled: true
      }
      this.taskService.addTask(newTask).subscribe((res) => {
        console.log(res);
        this.todo.push(newTask)
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
    }
  }

}
