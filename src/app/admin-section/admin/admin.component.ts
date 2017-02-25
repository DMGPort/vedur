import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ AdminService ]
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
