import { Component, OnInit } from '@angular/core';
import { Place } from '../../place';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  onSubmit(place,image){
    let landshluti: Place = {
      name: place.value,
      image: image.value
    }
    this.adminService.addPlace(landshluti);
    place.value = '';
    image.value = '';
  }
}
