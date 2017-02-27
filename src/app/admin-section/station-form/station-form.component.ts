import { Component, OnInit } from '@angular/core';
import { StationInfo } from '../../station-info';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.css']
})
export class StationFormComponent implements OnInit {

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  tegund = [
    {name: "Mönnuð skeytastöð"},
    {name: "Sjálfvirk veðurathugunarstöð"},
    {name: "Synop-skeyti búið til úr Metar og sjálfvirkri athugun"}
  ];
  landshlutar = [
    {name: "Faxaflói"},
    {name: "Breiðafjörður"},
    {name: "Vestfirðir"},
    {name: "Strandir og Norðurland vestra"},
    {name: "Norðurland eystra"},
    {name: "Austurland að Glettingi"},
    {name: "Austfirðir"},
    {name: "Suðausturland"},
    {name: "Suðurland"},
    {name: "Miðhálendið"}
  ];
  eigendur = [
    {name: "Veðurstofa Íslands"},
    {name: "Vegagerðin"},
    {name: "Landsnet"},
    {name: "Landsvirkjun"},
    {name: "Siglingastofnun"},
    {name: "Orkubú Vestfjarða"}
  ];

  onSubmit(place,name,type,number,location,altitude,since,owner) {
    let station: StationInfo = {
      name: name.value,
      type: type.value,
      stNumber: +number.value,
      location: location.value,
      altitude: +altitude.value,
      since: +since.value,
      owner: owner.value,
      image: 'holder'
    }
    this.adminService.addStation(place.value, station);
    name.value = '';
    number.value = '';
    location.value = '';
    altitude.value = '';
    since.value = '';
  }

}
