import {WasteCompanyLocation} from "../../Types";

export interface IWasteCompany {
    id: number,
    name: string,
    location: {
        lat: number,
        long: number
    },
    locations: WasteCompanyLocation[],
    address: string
}
