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
    this.stationService.appInit("Faxaflói");
  }
  
  selectChange(name){
    this.stationService.getStations(name);
  }

  check(){
    for(let x = 0; x < this.stationService.stations.length; x++){
      console.log(this.stationService.stations[x]);
    }
  }

}
