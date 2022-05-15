import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Response {
  task: string,
  type: string
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  selectedValue!: string;
  form!: FormGroup;

  types = [
    { value: "Planned", viewValue: "Planned"},
    { value: "In progress", viewValue: "In progress"},
    { value: "Finished", viewValue: "Finished" }
  ]

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Response,
  ) { }

  ngOnInit(): void {    
  }

}
