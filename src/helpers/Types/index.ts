export type PackageSizeTypes = "small" | "medium" | "large";

export type PackageType = {
  packageId: number;
  packageName: PackageSizeTypes;
  size: string;
  id: number;
  wasteTypeId?: number;
  wasteTypeName: string;
};

export type LocationPhotoType =
  | "wasteLocation"
  | "locationBefore"
  | "locationAfter";

export type GarbageCase = {
  packages: {
    small: PackageType[];
    medium: PackageType[];
    large: PackageType[];
  };
  id: number;
  location: LocationLatLong;
  address: string;
  wasteLocationId: number;
  locationBefore: File[] | string;
  locationAfter: File[] | string;
  wasteLocation: File[] | string;
  fetchedLocationPhotos: LocationPhotos[];
  tokenAmount: number;
  giftChallengeId: number | null;
  giftChallengeTitle: string;
  status: CaseStatus | null;
};

export type LocationPhotos = {
  createdAt: string;
  type: LocationPhotoType;
  url: string
}

export type CaseStatus = 'current' | 'pending' | 'rejected' | 'verified' | 'published' | 'new';
export enum CaseStatusEnum {
  current = 'current',
  pending = 'pending',
  rejected = 'rejected',
  verified = 'verified'
}


export type WasteCompanyLocation = {
  id: number;
  wasteLocationId: number;
  lat: number;
  long: number;
  address: string;
};

export type LocationLatLong = { lat: number; long: number };

export const AvailableImageFormats = ['image/jpeg', 'image/png', 'image/x-png'];

export type ListQueryParams = {
  userId?: number,
  search?: string,
  orderBy?: string,
  sort?: string,
  limit?: number,
  offset?: number
  id?: number,
  type?: string,
  status?: string[],
  createdBy?: number,
}
