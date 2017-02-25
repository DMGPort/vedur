import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

@Component({
  selector: 'app-station-preview',
  templateUrl: './station-preview.component.html',
  styleUrls: ['./station-preview.component.css']
})
export class StationPreviewComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }

  ngOnInit() {
  }

}
