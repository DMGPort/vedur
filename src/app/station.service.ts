import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Station } from './station';
import { Place } from './place';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { database } from 'firebase';

@Injectable()
export class StationService {

  constructor(
        private http : Http,
        private af: AngularFire
  ) {
    //fylgjast með völdum stöðvum hér     
   }
  //stations: FirebaseListObservable<Station[]>

  appInit(){
    this.getPlaces();
    this.getStations();
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
  getStations(){
    this.listStations()
      .subscribe(stat => this.stations = stat);
    console.log(this.stations)
  }
  listStations(){
    return this.af.database.list('/stations');
  }
    
  sortStations(){

  }
}