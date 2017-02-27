import { Pipe, PipeTransform } from '@angular/core';
import { StationInfo } from '../station-info';
import { StationService } from '../station.service';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform{

    constructor(
        private stationService: StationService
    ){}

    transform(stationInfo: any, searchTerm: string){
        if(searchTerm === undefined || searchTerm == "") return null;
        return this.stationService.searchList.filter(function(stationInfo){
            return stationInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
    }
}