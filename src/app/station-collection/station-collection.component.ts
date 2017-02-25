import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

@Component({
  selector: 'app-station-collection',
  templateUrl: './station-collection.component.html',
  styleUrls: ['./station-collection.component.css']
})
export class StationCollectionComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }

  ngOnInit() {
  }

}
