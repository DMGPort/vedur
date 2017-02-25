import { Component, OnInit } from '@angular/core';
import { StationService } from './station.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }
  
  ngOnInit() {
    this.stationService.appInit();
  }

}
