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

  dummyStation: StationInfo = {
    name: "Veldu Stöð",
    type: "string",
    stNumber: 0,
    location: "string",
    altitude: 0,
    since: 0,
    owner: "string",
    image: "string",
  }

  places: Place[]; //Array af landshlutum name/image frá Firebase
  placeName: string;
  stations: StationInfo[] = []; //Array af stöðvum með info frá Firebase
  searchList: StationInfo[] = []; //Array af stöðvum með info frá Firebase
  previewStationData: StationData = undefined;  //Svar frá api
  previewStationInfo: StationInfo = undefined; //Gögn um stöð frá Firebase
  stationCollection: StationComplete[] = [];

  getSearchList(){
    this.listSearch()
      .subscribe(places => this.searchList = places);
  }
  listSearch(){
    return this.af.database.list('/stations/'+ this.placeName);
  }
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
    this.placeName = name;
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
          if(data.results[0].valid == 0){
            alert("Engin Gögn Tiltæk í augnablikinu")
            return;
          }          
          if(data.results[0].valid == 1){
            this.previewStationData = new StationData(
              data.results[0].id ,data.results[0].name,
              data.results[0].time, data.results[0].T,
              +data.results[0].F, data.results[0].D,
              this.fullWindDirection(data.results[0].D),
              data.results[0].valid );
              this.previewStationInfo = this.stations[stationIndex];
              this.previewStationInfo.image = this.places[placeIndex].image;
          };
        }
      );
  }
  viewStationFromSearch(placeName: string, stationInfo: StationInfo){
    let stNumber = stationInfo.stNumber;
    this.getStationData(stNumber)
      .subscribe(
        data => {
          if(data.results[0].valid == 0){
            alert("Engin Gögn Tiltæk í augnablikinu")
            return;
          }          
          if(data.results[0].valid == 1){
            this.previewStationData = new StationData(
              data.results[0].id ,data.results[0].name,
              data.results[0].time, data.results[0].T,
              +data.results[0].F, data.results[0].D,
              this.fullWindDirection(data.results[0].D),
              data.results[0].valid );
              this.previewStationInfo = stationInfo;
              for(let x = 0; x < this.places.length; x++){
                if( this.places[x].name == placeName)
                this.previewStationInfo.image = this.places[x].image;
              }
          };
        }
      );
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
          let newData = new StationData(data.results[0].id ,data.results[0].name, data.results[0].time, data.results[0].T, data.results[0].F, data.results[0].D, this.fullWindDirection(data.results[0].D), data.results[0].valid);
          if(newData.time != this.stationCollection[index].time){
            this.stationCollection[index].time = newData.time;
            this.stationCollection[index].temp = newData.temp;
            this.stationCollection[index].wind = newData.wind;
            this.stationCollection[index].direction = newData.direction;
            this.stationCollection[index].directionDetailed = newData.directionDetailed;
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

  fullWindDirection(wind){
    if(wind == ""){
      this.previewStationData.direction = "Logn";
      return "Logn";
    }
    if(wind == "Logn"){
      return "Logn"
    }
    if(wind == "SSV"){
      return "Vindur úr suðsuðvesturátt."
    }
    if(wind == "SV"){
      return "Vindur úr suðvesturátt."
    }
    if(wind == "VSV"){
      return "Vindur úr vestsuðvesturátt"
    }
    if(wind == "V"){
      return "Vindur úr vesturátt"
    }
    if(wind == "VNV"){
      return "Vindur úr vestnorðvesturátt"
    }
    if(wind == "NV"){
      return "Vindur úr norðvesturátt."
    }
    if(wind == "NNV"){
      return "Vindur úr norðnorðvesturátt "
    }
    if(wind == "N"){
      return "Vindur úr norðurátt."
    }
    if(wind == "NNA"){
      return "Vindur úr norðnorðausturátt"
    }
    if(wind == "NA"){
      return "Vindur úr norðausturátt."
    }
    if(wind == "ANA"){
      return "Vindur úr austnorðausturátt"
    }
    if(wind == "A"){
      return "Vindur úr austurátt."
    }
    if(wind == "ASA"){
      return "Vindur úr austsuðausturátt"
    }
    if(wind == "SA"){
      return "Vindur úr suðausturátt."
    }
    if(wind == "SSA"){
      return "Vindur úr suðsuðausturátt "
    }
  }
}
