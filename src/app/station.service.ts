import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Station } from './station';
import { Place } from './place';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { database } from 'firebase';
import { StationResponse } from './station-response';

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

  stations: Station[];
  getStations(name: string){
    this.listStations(name)
      .subscribe(stat => this.stations = stat);
  }
  listStations(name){
    return this.af.database.list('/stations/'+ name);
  }
  
  previewStation: StationResponse;
  viewStation(stNumber){
    this.getStation(stNumber)
      .subscribe(
        data => {
          let stationResponse = new StationResponse(data.results[0].id ,data.results[0].name, data.results[0].time, data.results[0].T, data.results[0].F, data.results[0].valid );
          this.previewStation = stationResponse;
        }
      );
  }
  getStation(stNumber): Observable<any>{
    let stationUrl = "http://apis.is/weather/observations/is?stations="+stNumber+"&time=1h";
      return this.http.get(stationUrl)
      .map(response => response.json())
      .catch(error => {
         console.error(error);
         return Observable.throw(error.json())
      })    
  }

}
