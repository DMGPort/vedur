import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

@Component({
  selector: 'app-station-collection',
  templateUrl: './station-collection.component.html',
  styleUrls: ['./station-collection.component.css','../../shared/wind-compass.component.css']
})
export class StationCollectionComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }

  ngOnInit() {
  }
  
  update(index, stNumber){
    this.stationService.updateStationData(index, stNumber);
  }
  remove(stNumber){
    this.stationService.removeFromCollection(stNumber);
  }

}
