import {IWasteCompany} from "./IWasteCompany.interface";

export interface IWasteLocation {
    id: number,
    wasteCompanyId: number | null,
    location: {
        lat: number,
        long: number
    },
    address: string
    status?: string
    type: string
    name: string
}

export interface IFetchedWasteLocation extends IWasteLocation {
    description: string
    email: string
    googlePlaceId: number | string
    isActive: boolean
    phoneNumber: string
    statistics: {
        amountOfWaste: number
        approvedTokens: number
        visitorsNumber: number
    }
    wasteCompany: null | IWasteCompany
}
