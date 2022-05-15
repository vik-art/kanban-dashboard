import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  selectedValue!: string;

  types = [
    { value: "Planned", viewValue: "Planned"},
    { value: "In progress", viewValue: "In progress"},
    { value: "Finished", viewValue: "Finished"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
