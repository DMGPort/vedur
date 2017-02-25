import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Station } from './station';
import { Place } from './place';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class StationService {

  constructor(
        private http : Http,
        private af: AngularFire
  ) {
    this.landshlutar = af.database.list('/landshlutar');    
   }
  
  landshlutar: FirebaseListObservable<Place[]>;
}
