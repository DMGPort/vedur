import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Place } from './place';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { database } from 'firebase';
import { StationData } from './station-data';
import { StationInfo } from './station-info';
import { StationComplete} from './station-complete';

@Injectable()
export class StationService {

  constructor(
        private http : Http,
        private af: AngularFire
  ) {
    //fylgjast með völdum stöðvum hér     
   }
  //stations: FirebaseListObservable<Station[]>

  selectInit(name){
    this.getPlaces();
    this.getStations(name);
  }

  landshlutar: Place[];
  getPlaces(){
    this.listPlaces()
      .subscribe(places => this.landshlutar = places);
  }
  listPlaces(){
    return this.af.database.list('/landshlutar');
  }

  stations: StationInfo[];
  getStations(name: string){
    this.listStations(name)
      .subscribe(stat => this.stations = stat);
  }
  listStations(name){
    return this.af.database.list('/stations/'+ name);
  }

  previewStationData: StationData = undefined; 
  previewStationInfo: StationInfo = undefined;

  viewStation(index){
    let stNumber = this.stations[index].stNumber;
    this.getStationData(stNumber)
      .subscribe(
        data => {
          let stationResponse = new StationData(data.results[0].id ,data.results[0].name, data.results[0].time, data.results[0].T, data.results[0].F, data.results[0].D, data.results[0].valid );
          this.previewStationData = stationResponse;
        }
      );
    this.previewStationInfo = this.stations[index];
  }
  getStationData(stNumber): Observable<any>{
    let stationUrl = "http://apis.is/weather/observations/is?stations="+stNumber+"&time=1h";
      return this.http.get(stationUrl)
      .map(response => response.json())
      .catch(error => {
         console.error(error);
         return Observable.throw(error.json())
      })
  }

  stationCollection: StationComplete[] = [];
  mergeThenAdd(){
    let stationComplete: StationComplete = Object.assign(this.previewStationData, this.previewStationInfo);
    this.stationCollection.push(stationComplete)
  }

}
