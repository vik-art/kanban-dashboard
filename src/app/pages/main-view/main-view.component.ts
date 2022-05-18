import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskItem } from 'src/app/common/interfaces/task';
import { FormComponent } from 'src/app/components/form/form.component';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
    task!: string;
    type!: string;
    cdkDropListData!: string;

  planned: Array<TaskItem> = [];

  progress: Array<TaskItem> = [];

  finished: Array<TaskItem> = [];

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.taskService.getAll().subscribe(res => {
      res?.map(el => {
        switch (el.type) {
          case "planned":
            this.planned.push(el);
            break;
            case "progress": 
            this.progress.push(el);
            break;
            case "finished":
              this.finished.push(el);
              break;
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
        this.planned.push(res);
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
      console.log(event.container.id)
      switch(event.container.id) {
        case "cdk-drop-list-0":
          event.container.data.map((el: TaskItem) => {
            const task = {
              ...el,
            type: "planned",
            }
            this.taskService.update(task).subscribe(() => {})
          })
          break;
          case "cdk-drop-list-1":
            event.container.data.map((el: TaskItem) => {
              const task = {
                ...el,
              type: "progress",
              }
              this.taskService.update(task).subscribe(() => {})
            })
            break;
            case "cdk-drop-list-2":
              event.container.data.map((el: TaskItem) => {
                const task = {
                  ...el,
                type: "finished",
                }
                this.taskService.update(task).subscribe(() => {})
              })
              break;
      }
    }
    }
  }


