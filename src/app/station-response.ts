export class StationResponse {
    constructor(
        public id: string,
        public name: string,
        public time: string,
        public temp: number, //temp
        public wind: number, //wind
        public valid: string
    ){}
}