import {CaseStatus, LocationLatLong} from "../../Types";
import { GarbageCase, PackageType } from "../../Types";
import { IWasteCompany } from "./IWasteCompany.interface";
import { IWasteLocation } from "./IWasteLocation.interface";
import {ILocation} from "../Common/Common";
import {IGarbagePackage} from "./IGarbagePackages";
import {
  IFetchedUserRecyclingPoint,
  IFetchedUserRecyclingPointCase,
} from "../UserRecyclingPoint/IUserRecyclingPoint";

export interface IGarbage {
  case: GarbageCase;
  savedCase: GarbageCase | null;
  packageTypes: PackageType[];
  wasteTypes: { id: number; packageName: string }[];
  wasteCompanies: IWasteCompany[];
  wasteLocations: IWasteLocation[];
  userRecyclingPoints: IFetchedUserRecyclingPoint[]
  fetchedCases: { count: number; cases: GarbageCase[] };
  newUserRecyclingPoint: IFetchedUserRecyclingPointCase
  fetchedCasesForMap: IGarbageCaseForMap[];
}

export interface IGiftChallengeCase {
  address: string
  createdAt: number
  id: number
  location: ILocation
  packages: IGarbagePackage[]
}

export interface IGarbageCaseForMap {
  address: string;
  createdAt: string;
  id: number;
  packages: PackageType[];
  location: LocationLatLong;
  status: string;
  tokenAmount: number;
  user: {
    id: number | null;
    firstName: string;
    lastName: string;
    email: string;
    avatarLink: string;
    isDeleted: boolean;
    isActive: boolean;
  };
  wasteCompany: IWasteCompany;
  wasteLocation: IWasteLocation;
}
export type TableQueryParams = {
  search?: string,
  orderBy?: string,
  sort?: string,
  limit?: number,
  offset?: number,
  status?: CaseStatus[] | CaseStatus
}

export interface IImageParams {
  maxSize: string;
  fileTypes: string[];
}

export interface IDeleteOrSaveCaseModal {
  case: GarbageCase;
  onDelete: () => void;
  onSave: () => void;
}
