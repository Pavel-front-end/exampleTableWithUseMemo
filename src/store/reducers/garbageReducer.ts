import { GarbageActionsTypes } from "../actions/garbageActions/garbageActions";
import { IGarbage } from "../../helpers/Interfaces/Garbage/IGarbage.interface";

const garbageReducerDefaultState: IGarbage = {
  case: {
    packages: {
      small: [],
      medium: [],
      large: [],
    },
    location: { lat: 0, long: 0 },
    address: "",
    wasteLocationId: 0,
    id: 0,
    locationBefore: [],
    locationAfter: [],
    wasteLocation: [],
    fetchedLocationPhotos: [],
    tokenAmount: 0,
    giftChallengeId: null,
    giftChallengeTitle: '',
    status: null
  },
  savedCase: null,
  packageTypes: [],
  wasteTypes: [],
  wasteCompanies: [],
  wasteLocations: [],
  userRecyclingPoints: [],
  newUserRecyclingPoint: {
    id: 0,
    status: '',
    name: '',
    userId: 0,
    email: '',
    phoneNumber: '',
    address: '',
    location: {lat: 0, long: 0},
    wasteTypes: [],
    attachments: [],
    schedule: [],
    additionalPhoneNumber: '',
    description: '',
    otherWasteType: '',
    isActive: true,
    wasteLocationId: 0
  },
  fetchedCases: { count: 0, cases: [] },
  fetchedCasesCount: 0,
  fetchedCasesForMap: [],
} as IGarbage;

export const garbageReducer = (
  state = garbageReducerDefaultState,
  action: GarbageActionsTypes
) => {
  switch (action.type) {
    case "PACKAGE_QUANTITY_CHANGE":
      return {
        ...state,
        case: {
          ...state.case,
          packages: {
            ...state.case.packages,
            [action.payload.type]: action.payload.packages,
          },
        },
      };
    case "SET_WASTE_TYPES":
      return {
        ...state,
        wasteTypes: action.data.wasteTypes,
      };
    case "SET_PACKAGE_TYPES":
      return {
        ...state,
        packageTypes: action.data,
      };
    case "SET_SELECTED_PACKAGE":
      return {
        ...state,
        case: {
          ...state.case,
          packages: {
            ...state.case.packages,
            [action.payload.packageType]: [
              ...state.case.packages[action.payload.packageType].filter(
                (item: any) => {
                  return item.id !== action.payload.garbagePackage.id;
                }
              ),
              {
                id: action.payload.garbagePackage.id,
                packageId: action.payload.garbagePackage.packageId,
                wasteTypeId: action.payload.selectedWasteTypeId,
              },
            ].sort((a, b) => a.id - b.id),
          },
        },
      };
    case "SET_FETCHED_CASES":
      return {
        ...state,
        fetchedCases: {
          count: action.fetchedCases.count,
          cases: action.fetchedCases.cases
        },
      };
      case "RESET_SAVED_CASE":
      return {
        ...state,
        savedCase: null
      };
    case "SET_SAVED_CASE":
      return {
        ...state,
        savedCase: action.savedCase,
      };
    case "SET_FETCHED_CASES_FOR_MAP":
      return {
        ...state,
        fetchedCasesForMap: action.fetchedCasesForMap,
      };
    case "SET_FETCHED_CASE_BY_ID":
      return {
        ...state,
        case: action.garbageCase,
      };
    case "SET_SELECTED_CASE":
      return {
        ...state,
        case: action.selectedCase,
      };
    case "RESET_CASE":
      return {
        ...state,
        case: garbageReducerDefaultState.case,
      };
    case "CHANGE_STATUS":
      return {
        ...state,
        case: {
          ...state.case,
          status: action.status,
        }
      };
    case "SET_LOCATION_PHOTO":
      return {
        ...state,
        case: {
          ...state.case,
          [action.payload.locationType]: action.payload.file,
        },
      };
    case "SET_GARBAGE_LOCATION":
      return {
        ...state,
        case: {
          ...state.case,
          location: action.location,
        },
      };
    case "SET_GARBAGE_LOCATION_ADDRESS":
      return {
        ...state,
        case: {
          ...state.case,
          address: action.address,
        },
      };
    case "SET_WASTE_LOCATION_ID":
      return {
        ...state,
        case: {
          ...state.case,
          wasteLocationId: action.wasteLocationId,
        },
      };
    case "SET_FETCHED_WASTE_COMPANIES":
      return {
        ...state,
        wasteCompanies: action.data,
      };
    case "SET_FETCHED_WASTE_LOCATIONS":
      return {
        ...state,
        wasteLocations: action.data,
      };
    case "SET_ATTACH_CASE_TO_CHALLENGE":
      return {
        ...state,
        case: {
          ...state.case,
          giftChallengeId: action.data.id,
          giftChallengeTitle: action.data.title
        }
      };
    case "DELETE_ATTACH_CASE_TO_CHALLENGE":
      return {
        ...state,
        case: {
          ...state.case,
          giftChallengeId: null,
          giftChallengeTitle: null
        }
      }
    case "SET_CASE_USER_RECYCLING_POINTS":
      return {
        ...state,
        userRecyclingPoints: action.data
      }
    case "UPDATE_RECYCLING_POINTS_LIST":
      return {
        ...state,
        case: {
          ...state.case,
          wasteLocationId: action.data.wasteLocation.id
        },
        newUserRecyclingPoint: {
          ...action.data.userRecyclingPoint,
          wasteLocationId: action.data.wasteLocation.id
        },
      }
    case "CLEAR_CASE_STATE":
      return garbageReducerDefaultState
    default:
      return state
  }
};
