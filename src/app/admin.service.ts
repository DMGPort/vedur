import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { StationInfo } from './station-info';
import { Place } from './place';

@Injectable()
export class AdminService {

  constructor(
    private http: Http
  ) { }
  
  baseUrl: string = 'https://vedur3000-d017f.firebaseio.com';

  addStation(place: string, station: StationInfo){
    const body = JSON.stringify(station)
    console.log(body);
    return this.http.post(this.baseUrl + "/"+ "stations" +"/"+ place +".json", body)
               .map((res: Response) => res.json())
               .subscribe();
  }

  addPlace(landshluti: Place){
    const body = JSON.stringify(landshluti)
    return this.http.post(this.baseUrl + "/"+ "landshlutar.json", body)
               .map((res: Response) => res.json())
               .subscribe();
  }

}
