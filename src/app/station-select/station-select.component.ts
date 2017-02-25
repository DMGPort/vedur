import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

@Component({
  selector: 'app-station-select',
  templateUrl: './station-select.component.html',
  styleUrls: ['./station-select.component.css']
})
export class StationSelectComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }

  ngOnInit() {
    this.stationService.selectInit("Faxaflói");
  }
  
  selectChange(name){
    this.stationService.getStations(name);
  }

  getStat(stNumber){
    this.stationService.viewStation(stNumber);
  }

}
