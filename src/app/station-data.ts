export class StationData {
    constructor(
        public id: string,
        public name: string,
        public time: string,
        public temp: number, //temp
        public wind: number, //wind
        public direction: string, //wind direction
        public valid: string
    ){}
}