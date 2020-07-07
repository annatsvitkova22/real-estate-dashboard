export class Estate {
    constructor(
        public name: string,
        public date: string,
        public model: string,
        public isSold: boolean = false,
        public id ?: number
    ) {}
}

export interface Estates {
    estates: Estate[];
}

export interface IdEstate {
    id: number;
}
