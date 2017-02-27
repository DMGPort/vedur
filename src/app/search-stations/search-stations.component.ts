import { Component, OnInit } from '@angular/core';
import { StationService } from '../station.service';

@Component({
  selector: 'app-search-stations',
  templateUrl: './search-stations.component.html',
  styleUrls: ['./search-stations.component.css']
})
export class SearchStationsComponent implements OnInit {

  constructor(
    private stationService: StationService
  ) { }

  ngOnInit() {
    this.stationService.getSearchList();
  }
  searchTerm: string;
  onBlur(){
    setTimeout(() => {
      this.stationService.getSearchList();
      this.searchTerm = '';   
      }, 200);
    }
  previewStation(stationInfo){
    let placeName = this.stationService.placeName;
    this.stationService.viewStationFromSearch(placeName, stationInfo);
  }
}
