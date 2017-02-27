import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';
import { StationInfo } from '../station-info';

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
  
  placeChange(index){  
    let name = this.stationService.places[index].name;
    this.stationService.getStations(name);
  }

  previewStation(placeIndex, stationIndex){
    this.stationService.viewStation(placeIndex, stationIndex);
  }

}
