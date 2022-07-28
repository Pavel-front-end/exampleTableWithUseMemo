import * as actionTypes from "../types/actionsTypes";
import {
    GarbageCase,
    LocationPhotoType,
    PackageSizeTypes,
    PackageType,
} from "../../../helpers/Types";
import {IGarbagePackages} from "../../../helpers/Interfaces/Garbage/IGarbagePackages";
import {IGiftChallenge} from '../../../helpers/Interfaces/GiftChallenges/IGiftChallenge';
import {
    IFetchedUserRecyclingPoint,
    IUserRecyclingPoint
} from "../../../helpers/Interfaces/UserRecyclingPoint/IUserRecyclingPoint";
import {IFetchedWasteLocation, IWasteLocation} from "../../../helpers/Interfaces/Garbage/IWasteLocation.interface";

export interface IGarbagePackageQuantityChange {
    type: typeof actionTypes.PACKAGE_QUANTITY_CHANGE;
    payload: {
        type: PackageSizeTypes;
        packages: IGarbagePackages;
    };
}

export interface ISetWasteTypes {
    type: typeof actionTypes.SET_WASTE_TYPES;
    data: any;
}

export interface ISetPackageTypes {
    type: typeof actionTypes.SET_PACKAGE_TYPES;
    data: any;
}

export interface ISetSelectedPackage {
    type: typeof actionTypes.SET_SELECTED_PACKAGE;
    payload: {
        packageType: PackageSizeTypes;
        garbagePackage: PackageType;
        selectedWasteTypeId: number;
    };
}

export interface ISetLocationPhotos {
    type: typeof actionTypes.SET_LOCATION_PHOTO;
    payload: {
        file: File | string;
        locationType: LocationPhotoType;
    };
}

export interface ISetFetchedCases {
    type: typeof actionTypes.SET_FETCHED_CASES;
    fetchedCases: {
        count: number,
        cases: GarbageCase[]
    };
}

export interface ISetFetchedCasesForMap {
    type: typeof actionTypes.SET_FETCHED_CASES_FOR_MAP;
    fetchedCasesForMap: GarbageCase[];
}

export interface ISetFetchedCaseById {
    type: typeof actionTypes.SET_FETCHED_CASE_BY_ID;
    garbageCase: any;
}

export interface ISetSelectedCase {
    type: typeof actionTypes.SET_SELECTED_CASE;
    selectedCase: GarbageCase;
}

export interface IResetCase {
    type: typeof actionTypes.RESET_CASE;
}

export interface IChangeStatus {
    type: typeof actionTypes.CHANGE_STATUS;
    status: string;
}

export interface ISetFetchedWasteCompanies {
    type: typeof actionTypes.SET_FETCHED_WASTE_COMPANIES;
    data: {
        id: string;
        name: string;
        location: {
            lat: number;
            long: number;
        };
        address: string;
    };
}

export interface ISetFetchedWasteLocations {
    type: typeof actionTypes.SET_FETCHED_WASTE_LOCATIONS;
    data: IWasteLocation[]
}

export interface ISetGarbageLocation {
    type: typeof actionTypes.SET_GARBAGE_LOCATION;
    location: {
        lat: number;
        long: number;
    };
}

export interface ISetGarbageLocationAddress {
    type: typeof actionTypes.SET_GARBAGE_LOCATION_ADDRESS;
    address: string;
}

export interface ISetWasteLocation {
    type: typeof actionTypes.SET_WASTE_LOCATION_ID;
    wasteLocationId: number;
}

export interface IAttachCaseToChallenge {
    type: typeof actionTypes.SET_ATTACH_CASE_TO_CHALLENGE;
    data: IGiftChallenge;
}

export interface IDeleteAttachCaseToChallenge {
    type: typeof actionTypes.DELETE_ATTACH_CASE_TO_CHALLENGE;
    data: null;
}

export interface ISetSavedCases {
    type: typeof actionTypes.SET_SAVED_CASE;
    savedCase: GarbageCase;
}

export interface IResetSavedCases {
    type: typeof actionTypes.RESET_SAVED_CASE;
}

export interface IClearCaseState {
    type: typeof actionTypes.CLEAR_CASE_STATE
}

interface ISetCaseUserRecyclingPoints {
    type: typeof actionTypes.SET_CASE_USER_RECYCLING_POINTS
    data: IUserRecyclingPoint[]
}

interface IUpdateRecyclingPointsList {
    type: typeof actionTypes.UPDATE_RECYCLING_POINTS_LIST
    data: {
        userRecyclingPoint: IFetchedUserRecyclingPoint
        wasteLocation: IFetchedWasteLocation
    }
}

export type GarbageActionsTypes =
    | IGarbagePackageQuantityChange
    | ISetWasteTypes
    | ISetPackageTypes
    | ISetSelectedPackage
    | ISetLocationPhotos
    | ISetFetchedWasteCompanies
    | ISetFetchedWasteLocations
    | ISetFetchedCases
    | ISetFetchedCasesForMap
    | ISetFetchedCaseById
    | ISetSelectedCase
    | IResetCase
    | ISetGarbageLocation
    | ISetGarbageLocationAddress
    | ISetWasteLocation
    | IAttachCaseToChallenge
    | ISetSavedCases
    | IResetSavedCases
    | IDeleteAttachCaseToChallenge
    | IChangeStatus
    | IClearCaseState
    | ISetCaseUserRecyclingPoints
    | IUpdateRecyclingPointsList
