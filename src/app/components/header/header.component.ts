import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  color: ThemePalette = 'primary';
  checked: boolean = false;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChange () {
    this.checked = !this.checked;
   }

}
