import * as actionTypes from "../types/actionsTypes";
import {
  CaseStatusEnum,
  GarbageCase,
  LocationPhotoType,
  PackageSizeTypes,
  PackageType,
} from "../../../helpers/Types";
import { AppActions } from "../types/actions";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import axios from "../../../apis/axios";
import { modalOpen } from "../modalActions/modal";
import { AppState } from "../../store";
import { PackageSize } from "../../../helpers/Enums/PackageSize";
import imageCompression from "browser-image-compression";
import {
  appStateLoadingFinish,
  appStateLoadingStart,
} from "../globalAppActions/globalAppState";
import {IGarbage, TableQueryParams} from "../../../helpers/Interfaces/Garbage/IGarbage.interface";
import {toast} from "react-toastify";
import {IUserRecyclingPoint} from "../../../helpers/Interfaces/UserRecyclingPoint/IUserRecyclingPoint";
import {IWasteLocation} from "../../../helpers/Interfaces/Garbage/IWasteLocation.interface";

const setPackages = (type: PackageSizeTypes, packages: any) => {
  return {
    type: actionTypes.PACKAGE_QUANTITY_CHANGE,
    payload: {
      type,
      packages,
    },
  };
};

export const caseQuantityChange = (
  type: PackageSizeTypes,
  quantity: number,
  garbage: IGarbage
) => async (dispatch: any) => {
  let packageId: number;

  switch (type) {
    case "small":
      packageId = PackageSize.small;
      break;
    case "medium":
      packageId = PackageSize.medium;
      break;
    case "large":
      packageId = PackageSize.large;
      break;
  }

  if (
    garbage.case.packages[type].length !== quantity ||
    garbage.case.packages[type].length === 0
  ) {
    const difference = garbage.case.packages[type].length - quantity;
    if (difference > 0) {
      const filteredPackages = garbage.case.packages[type].filter(
        (item: any, index: number) => index < quantity
      );
      dispatch(setPackages(type, filteredPackages));
    } else {
      let edited: any = [...garbage.case.packages[type]];
      for (let i = 0; i < Math.abs(difference); i++) {
        edited = [
          ...edited,
          {
            id: edited.length,
            packageId,
            wasteTypeId: 1,
          },
        ];

        dispatch(setPackages(type, edited));
      }
    }
  }
};

const setFetchedCases = (fetchedCases: { count: number; cases: GarbageCase[] }) => {
  return {
    type: actionTypes.SET_FETCHED_CASES,
    fetchedCases,
  };
};

const setFetchedCasesForMap = (fetchedCasesForMap: GarbageCase[]) => {
  return {
    type: actionTypes.SET_FETCHED_CASES_FOR_MAP,
    fetchedCasesForMap,
  };
};

const setSavedCase = (savedCase: GarbageCase) => {
  return {
    type: actionTypes.SET_SAVED_CASE,
    savedCase,
  };
};

export const resetSavedCase = () => {
  return {
    type: actionTypes.RESET_SAVED_CASE,
  };
};

const setFetchedCaseById = (fetchedCase: any, id: number) => {
  const garbageCase = {
    id,
    packages: fetchedCase.packages
      ? {
          small: fetchedCase.packages
            .filter((item: any) => {
              return item.packageId === PackageSize.small;
            })
            .map((item: any, id: number) => {
              return { ...item, id };
            }),
          medium: fetchedCase.packages
            .filter((item: any) => item.packageId === PackageSize.medium)
            .map((item: any, id: number) => {
              return { ...item, id };
            }),
          large: fetchedCase.packages
            .filter((item: any) => item.packageId === PackageSize.large)
            .map((item: any, id: number) => {
              return { ...item, id };
            }),
        }
      : {
          small: [],
          medium: [],
          large: [],
        },
    location: fetchedCase.location,
    wasteLocationId: fetchedCase.wasteLocationId,
    fetchedLocationPhotos: fetchedCase.attachments,
    address: fetchedCase.address,
    locationBefore: [],
    locationAfter: [],
    wasteLocation: [],
    status: fetchedCase.status,
    giftChallengeId: fetchedCase.giftChallengeId,
    giftChallengeTitle: fetchedCase.giftChallenge && fetchedCase.giftChallenge.title,
  };

  return {
    type: actionTypes.SET_FETCHED_CASE_BY_ID,
    garbageCase,
  };
};

export const fetchCases = (queryParams?: TableQueryParams) => async (dispatch: Dispatch<AppActions>) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");
  try {
    if (token) {

      if (!queryParams) queryParams = {};

        const searchParam = queryParams.search
            ? `search=${queryParams.search}`
            : '';
        const orderByParam = queryParams.orderBy
            ? `&orderBy=${queryParams.orderBy}`
            : '';
        const sortParam = queryParams.sort
            ? `&sort=${queryParams.sort}`
            : '';
        const limitParam = queryParams.limit
            ? `&limit=${queryParams.limit}`
            : '';
        const offsetParam = queryParams.offset
            ? `&offset=${queryParams.offset}`
            : '';
        const statusParam = queryParams.status
            ? (Array.isArray(queryParams.status)) ? queryParams.status.map((item) => `&status=${item}`).join('') : `&status=${queryParams.status}`
            : '';
        const res = await axios.get(`/cases?${searchParam}${orderByParam}${sortParam}${limitParam}${offsetParam}${statusParam}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setFetchedCases(res.data))
        return
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong",
        text: e.response?.data?.message,
      })
    );
  }
};

export const fetchCasesForMap = () => async (
  dispatch: Dispatch<AppActions>
) => {
  try {
    const res = await axios.get("/cases/map");
    dispatch(setFetchedCasesForMap(res.data.cases));
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong",
        text: e.response?.data?.message,
      })
    );
  }
};

export const fetchCaseById = (id: number) => async (
  dispatch: Dispatch<AppActions>
) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");
  dispatch(appStateLoadingStart());
  try {
    if (token) {
      const res = await axios.get(`/cases/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setFetchedCaseById(res.data.case, id));
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong with fetching case by id",
        text: e.response?.data?.message,
      })
    );
  } finally {
    dispatch(appStateLoadingFinish());
  }
};

export const setCase = (selectedCase: GarbageCase) => {
  return {
    type: actionTypes.SET_SELECTED_CASE,
    selectedCase,
  };
};

export const resetCase = () => {
  return {
    type: actionTypes.RESET_CASE,
  };
};

export const setLocationPhoto = (
  file: File | string,
  locationType: LocationPhotoType
) => {
  return {
    type: actionTypes.SET_LOCATION_PHOTO,
    payload: {
      file,
      locationType,
    },
  };
};

export const fetchPackages = () => async (dispatch: Dispatch<AppActions>) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");
  let transformedData = {};
  try {
    if (token) {
      const res = await axios.get("/packages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.data.packages
        .sort((a: any, b: any) => {
          return a.id - b.id;
        })
        .map((item: any) => {
          return transformedData = {
            ...transformedData,
            [item.name]: item,
          };
        });
      dispatch(setPackageTypes(transformedData));
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong with getting cases",
        text: e.response?.data?.message,
      })
    );
  }
};

export const fetchWasteType = () => async (dispatch: Dispatch<AppActions>) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");
  try {
    if (token) {
      const res = await axios.get("/waste-types", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setWasteTypes(res.data));
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong with getting waste types",
        text: e.response?.data?.message,
      })
    );
  }
};

export const saveCase = (toast?: any, cb?: (savedCase: GarbageCase) => void) => async (
  dispatch: Dispatch<AppActions>,
  getState: () => AppState
) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");

  const garbage: IGarbage = getState().garbage;

  try {
    dispatch(appStateLoadingStart());
    //update current
    if (garbage.case.id) {
      try {
        if (token) {
          let formData = new FormData();

          const options = {
            maxSizeMB: 3,
          };
          try {
            if (garbage.case.locationBefore.length) {
              let compressedFileLocationBefore: any = garbage.case.locationBefore;
              if (garbage.case.locationBefore && garbage.case.locationBefore instanceof FileList) {
                compressedFileLocationBefore = await imageCompression(
                    garbage.case.locationBefore[0] as File,
                    options
                ) as File;
                formData.append("locationBefore", compressedFileLocationBefore);
              }
            }

            if (garbage.case.locationAfter.length) {
              let compressedFileLocationAfter: any = garbage.case.locationAfter;
              if (garbage.case.locationAfter && garbage.case.locationAfter instanceof FileList) {
                compressedFileLocationAfter = await imageCompression(
                    garbage.case.locationAfter[0] as File,
                    options
                ) as File;
                formData.append("locationAfter", compressedFileLocationAfter);
              }
            }

            if (garbage.case.wasteLocation.length) {
              let compressedFileWasteLocation: any = garbage.case.wasteLocation;
              if (garbage.case.wasteLocation && garbage.case.wasteLocation instanceof FileList) {
                compressedFileWasteLocation = await imageCompression(
                    garbage.case.wasteLocation[0] as File,
                    options
                ) as File;
                formData.append("wasteLocation", compressedFileWasteLocation);
              }
            }

            if (typeof garbage.case.giftChallengeId === 'number') {
              formData.append("giftChallengeId", garbage.case.giftChallengeId.toString());
            } else {
              formData.append("giftChallengeId", 'null');
            }

            if (garbage.case.status?.length) {
              formData.append("status", garbage.case.status);
            }

          } catch (error) {
            console.log(error);
          }
          formData.append("location", JSON.stringify(garbage.case.location));
          formData.append("address", garbage.case.address);

          if (garbage.case.wasteLocationId) {
            formData.append(
              "wasteLocationId",
              garbage.case.wasteLocationId.toString()
            );
          }

          formData.append(
            "packages",
            JSON.stringify([
              ...garbage.case.packages.small,
              ...garbage.case.packages.medium,
              ...garbage.case.packages.large,
            ])
          );
          const response = await axios.put(
            `/cases/${garbage.case.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if ((response.status === 200)) {
            if (toast) {
              toast.success("Saved successfully");
            }
            if (response.data.case && response.data.case.status === CaseStatusEnum.pending) {
              dispatch(setSavedCase(response.data.case))

            }

            if (cb) cb(response.data.case);
            fetchCases();
          }
        }
      } catch (e) {
        dispatch(
          modalOpen({
            title: "Something went wrong with edit case",
            text: e.response?.data?.message,
          })
        );
      } finally {
        dispatch(appStateLoadingFinish());
      }
      return;
    }

    //create new
    if (
      garbage.case.location.lat ||
      garbage.case.location.long ||
      garbage.case.locationAfter.length ||
      garbage.case.locationBefore.length
    ) {
      try {
        if (token) {
          let formData = new FormData();

          const options = {
            maxSizeMB: 3,
          };

          try {
            if (garbage.case.locationBefore.length) {
              const compressedFileLocationBefore = await imageCompression(
                garbage.case.locationBefore[0] as File,
                options
              );
              formData.append("locationBefore", compressedFileLocationBefore);
            }

            if (garbage.case.locationAfter.length) {
              const compressedFileLocationAfter = await imageCompression(
                garbage.case.locationAfter[0] as File,
                options
              );
              formData.append("locationAfter", compressedFileLocationAfter);
            }

            if (garbage.case.wasteLocation.length) {
              const compressedFileWasteLocation = await imageCompression(
                garbage.case.wasteLocation[0] as File,
                options
              );
              formData.append("wasteLocation", compressedFileWasteLocation);
            }
            if (typeof garbage.case.giftChallengeId === 'number') {
              formData.append("giftChallengeId", garbage.case.giftChallengeId.toString());
            } else {
              formData.append("giftChallengeId", 'null');
            }

            if (garbage.case.status?.length) {
              formData.append("status", garbage.case.status);
            }
          } catch (error) {
            console.log(error);
          }

          if (garbage.case.location.lat || garbage.case.location.long)
            formData.append("location", JSON.stringify(garbage.case.location));
          if (garbage.case.address)
            formData.append("address", garbage.case.address);
          if (garbage.case.wasteLocationId) 
            formData.append(
              "wasteLocationId",
              garbage.case.wasteLocationId.toString()
            );
          if (
            garbage.case.packages.small.length ||
            garbage.case.packages.medium.length ||
            garbage.case.packages.large.length
          )
            formData.append(
              "packages",
              JSON.stringify([
                ...garbage.case.packages.small,
                ...garbage.case.packages.medium,
                ...garbage.case.packages.large,
              ])
            );

          const response = await axios.post("/cases", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

          if ((response.status === 200)) {
            if (toast) {
              toast.success("Saved successfully");
            }
            if (cb) cb(response.data.case);
            dispatch(setFetchedCaseById(response.data.case, response.data.case.id));
          }
        }
      } catch (e) {
        dispatch(
          modalOpen({
            title: "Something went wrong with save new case",
            text: e.response?.data?.message,
          })
        );
      } finally {
        dispatch(appStateLoadingFinish());
      }
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong",
        text: e.response?.data?.message,
      })
    );
  } finally {
    dispatch(appStateLoadingFinish());
  }
};

const setWasteTypes = (data: { id: number; type: string }) => {
  return {
    type: actionTypes.SET_WASTE_TYPES,
    data,
  };
};

const setPackageTypes = (data: any) => {
  return {
    type: actionTypes.SET_PACKAGE_TYPES,
    data,
  };
};

export const setSelectedPackages = (
  packageType: PackageSizeTypes,
  garbagePackage: PackageType,
  selectedWasteTypeId: number
) => {
  return {
    type: actionTypes.SET_SELECTED_PACKAGE,
    payload: {
      packageType,
      garbagePackage,
      selectedWasteTypeId,
    },
  };
};

export const getWasteCompanies = () => async (
  dispatch: Dispatch<AppActions>
) => {
  const token =
    Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");
  try {
    if (token) {
      const res = await axios.get("/waste-companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setFetchedWasteCompanies(res.data.wasteCompanies));
    }
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong with getting waste companies",
        text: e.response?.data?.message,
      })
    );
  }
};

export const getWasteLocations = () => async (dispatch: Dispatch<AppActions>) => {
  try {
    const res = await axios.get("/waste-locations");
    dispatch(setFetchedWasteLocations(res.data.wasteLocations));
  } catch (e) {
    dispatch(
      modalOpen({
        title: "Something went wrong with getting waste companies",
        text: e.response?.data?.message,
      })
    );
  }
};

const setFetchedWasteCompanies = (data: {
  id: string;
  name: string;
  location: {
    lat: number;
    long: number;
  };
  address: string;
}) => {
  return {
    type: actionTypes.SET_FETCHED_WASTE_COMPANIES,
    data,
  };
};

const setFetchedWasteLocations = (data: IWasteLocation[]) => {
  return {
    type: actionTypes.SET_FETCHED_WASTE_LOCATIONS,
    data,
  };
};

export const setGarbageLocation = (location: { lat: number; long: number }) => {
  return {
    type: actionTypes.SET_GARBAGE_LOCATION,
    location,
  };
};

export const setGarbageLocationAddress = (address: string) => {
  return {
    type: actionTypes.SET_GARBAGE_LOCATION_ADDRESS,
    address,
  };
};

export const changeGarbageStatus = (status: string) => {
  return {
    type: actionTypes.CHANGE_STATUS,
    status,
  };
};

export const setWasteLocationId = (wasteLocationId: number) => {
  return {
    type: actionTypes.SET_WASTE_LOCATION_ID,
    wasteLocationId,
  };
};

export const deleteCase = (caseId: number, cb?: () => void) => async (
    dispatch: Dispatch<AppActions>
) => {
  const token =
      Cookies.get("tokenHoper") || sessionStorage.getItem("sessionToken");

  try {
    const response = await axios.delete(`/cases/${caseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        });
    if ((response.status === 200)) {
      if (cb) {
        cb();
      }
      toast.success('Successfully deleted case')
    }
  } catch (e) {
    dispatch(
        modalOpen({
          title: "Something went wrong",
          text: e.response?.data?.message,
        })
    );
  }
}

export const clearCaseState = () => {
  return {
    type: actionTypes.CLEAR_CASE_STATE
  }
}

export const setRecyclingPointsForCase = (data: IUserRecyclingPoint[]) => {
  return {
    type: actionTypes.SET_CASE_USER_RECYCLING_POINTS,
    data
  }
}

