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
  ) {}

  places: Place[]; //Array af landshlutum name/image frá Firebase
  stations: StationInfo[]; //Array af stöðvum með info frá Firebase
  previewStationData: StationData = undefined;  //Svar frá api
  previewStationInfo: StationInfo = undefined; //Gögn um stöð frá Firebase
  stationCollection: StationComplete[] = [];

  selectInit(place){
    this.getPlaces();
    this.getStations(place);
  }
  getPlaces(){
    this.listPlaces()
      .subscribe(places => this.places = places);
  }
  listPlaces(){
    return this.af.database.list('/landshlutar');
  }
  getStations(name: string){
    this.listStations(name)
      .subscribe(stat => this.stations = stat);
  }
  listStations(place){
    return this.af.database.list('/stations/'+ place);
  }
  viewStation(placeIndex, stationIndex){
    let stNumber = this.stations[stationIndex].stNumber;
    this.getStationData(stNumber)
      .subscribe(
        data => {
          this.previewStationData = new StationData(data.results[0].id ,data.results[0].name, data.results[0].time, data.results[0].T, data.results[0].F, data.results[0].D, data.results[0].valid );
        }
      );
    this.previewStationInfo = this.stations[stationIndex];
    this.previewStationInfo.image = this.places[placeIndex].image;
  }
  getStationData(stNumber): Observable<any>{//Finna leið til að redirecta gegnum https ??
    let stationUrl = "http://apis.is/weather/observations/is?stations="+stNumber+"&time=1h";
      return this.http.get(stationUrl)
      .map(response => response.json())
      .catch(error => {
         console.error(error);
         return Observable.throw(error.json())
      })
  }
  mergeThenAdd(){
    let stationComplete: StationComplete = Object.assign(this.previewStationData, this.previewStationInfo);
    if(stationComplete.valid == '0'){
      alert("Engin Gögn Tiltæk") //TODO: gefa möguleika á að bæta samt við safn
      return;
    }
    if(this.stationCollection.length == 0){
        this.stationCollection.push(stationComplete);
        return;         
    }
    if(this.stationCollection.length > 0){
      for(let x = 0; x < this.stationCollection.length; x++){
        if(this.stationCollection[x].stNumber == stationComplete.stNumber ){
          alert("Stöð þegar í safni")
          return;
        }
      }
      this.stationCollection.push(stationComplete);      
    }
  }
  updateStationData(index, stNumber){
    this.getStationData(stNumber)
      .subscribe(
        data => {
          let newData = new StationData(data.results[0].id ,data.results[0].name, data.results[0].time, data.results[0].T, data.results[0].F, data.results[0].D, data.results[0].valid);
          if(newData.time != this.stationCollection[index].time){
            this.stationCollection[index].time = newData.time;
            this.stationCollection[index].temp = newData.temp;
            this.stationCollection[index].wind = newData.wind;
            this.stationCollection[index].direction = newData.direction;
            alert("Gögn uppfærð")
            return;
          }else{
            alert("Nýjustu gögn þegar til staðar")
          }
        }
      );
  }
  removeFromCollection(stNumber){
    for(let x = 0; x < this.stationCollection.length; x++){
        if(this.stationCollection[x].stNumber == stNumber){
          this.stationCollection.splice(x, 1);
        }
      }
  }

}
