export class StationComplete {
    constructor(
        //StationData
        public id: string,
        public name: string,
        public time: string,
        public temp: number,
        public wind: number,
        public direction: string,
        public valid: string,
        //StationInfo
        public type: string,
        public stNumber: number,
        public location: string,
        public altitude: number,
        public since: number,
        public owner: string,
    ){}
}