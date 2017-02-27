import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dyno-dialog',
  templateUrl: './dyno-dialog.component.html',
  styleUrls: ['./dyno-dialog.component.css']
})
export class DynoDialogComponent implements OnInit {

  constructor() { }
  
  message: string = "";
  ngOnInit() {
    this.message = localStorage.getItem('dialog_message');
  }

}

