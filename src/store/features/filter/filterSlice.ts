// store/features/filter/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenderState, RommatesState, AddressState } from '@/types/common';

export interface FilterState {
  page: number;
  sort: number;
  selectedGender: GenderState | null;
  minPrice: number | null;
  maxPrice: number | null;
  roommates: RommatesState | null;
  address: AddressState;
  rooms: number | null;
  minAge: number | null;
  maxAge: number | null;
  moveInDate: string | null;
  termType: 'long' | 'short' | null;
  minFloor: number | null;
  maxFloor: number | null;
  isNotFirstFloor: boolean;
  isNotLastFloor: boolean;
  minArea: number | null;
  maxArea: number | null;
  petsAllowed: boolean;
  utilitiesIncluded: boolean;
  forStudents: boolean;
  onlyEmptyApartments: boolean;
  badHabitsAllowed: boolean;
  propertyType: string;
  role: string;
  selectedMapPoints: any;
}

export const initialState: FilterState = {
  page: 1,
  sort: 1,
  selectedGender: null,
  minPrice: null,
  maxPrice: null,
  roommates: null,
  address: {
    regionId: null,
    regionName: 'Весь Казахстан',
    districtId: null,
    districtName: '',
    microDistrictId: null,
    microDistrictName: '',
  },
  rooms: null,
  minAge: null,
  maxAge: null,
  moveInDate: null,
  termType: null,
  minFloor: null,
  maxFloor: null,
  isNotFirstFloor: false,
  isNotLastFloor: false,
  minArea: null,
  maxArea: null,
  petsAllowed: false,
  utilitiesIncluded: false,
  forStudents: false,
  onlyEmptyApartments: false,
  badHabitsAllowed: false,
  propertyType: '',
  role: '',
  selectedMapPoints: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<number>) => {
      state.sort = action.payload;
    },
    setGender: (state, action: PayloadAction<GenderState | null>) => {
      state.selectedGender = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setRoommates: (state, action: PayloadAction<RommatesState | null>) => {
      state.roommates = action.payload;
    },
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state.address = action.payload;
    },
    setRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
    setMinAge: (state, action: PayloadAction<number>) => {
        state.minAge = action.payload;
    },
    setMaxAge: (state, action: PayloadAction<number>) => {
        state.maxAge = action.payload;
    },
    setMoveInDate: (state, action: PayloadAction<string>) => {
      state.moveInDate = action.payload;
    },
    setTermType: (state, action: PayloadAction<'long' | 'short' | null>) => {
      state.termType = action.payload;
    },
    setMinFloor: (state, action: PayloadAction<number>) => {
      state.minFloor = action.payload;
    },
    setMaxFloor: (state, action: PayloadAction<number>) => {
      state.maxFloor = action.payload;
    },
    setIsNotFirstFloor: (state, action: PayloadAction<boolean>) => {
      state.isNotFirstFloor = action.payload;
    },
    setIsNotLastFloor: (state, action: PayloadAction<boolean>) => {
      state.isNotLastFloor = action.payload;
    },
    setMinArea: (state, action: PayloadAction<number>) => {
        state.minArea = action.payload;
    },
    setMaxArea: (state, action: PayloadAction<number>) => {
        state.maxArea = action.payload;
    },
    setPetsAllowed: (state, action: PayloadAction<boolean>) => {
      state.petsAllowed = action.payload;
    },
    setUtilitiesIncluded: (state, action: PayloadAction<boolean>) => {
      state.utilitiesIncluded = action.payload;
    },
    setForStudents: (state, action: PayloadAction<boolean>) => {
      state.forStudents = action.payload;
    },
    setOnlyEmptyApartments: (state, action: PayloadAction<boolean>) => {
      state.onlyEmptyApartments = action.payload;
    }, 
    setBadHabitsAllowed: (state, action: PayloadAction<boolean>) => {
      state.badHabitsAllowed = action.payload;
    },
    setPropertyType: (state, action: PayloadAction<string>) => {
      state.propertyType = action.payload;
    },
    setOwnerType: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setSelectedMapPoints: (state, action: PayloadAction<{}[]>) => {
      state.selectedMapPoints = action.payload;
    },
    resetFilter: (state) => {
      return initialState;
    }
  },
});

export const {
  setCurrentPage,
  setCurrentOrder,
  setGender,
  setAddress,
  setMinPrice,
  setMaxPrice,
  setRoommates,
  setRooms,
  setMinAge,
  setMaxAge,
  setMoveInDate,
  setTermType,
  setMinFloor,
  setMaxFloor,
  setIsNotFirstFloor,
  setIsNotLastFloor,
  setMinArea,
  setMaxArea,
  setPetsAllowed,
  setUtilitiesIncluded,
  setForStudents,
  setOnlyEmptyApartments,
  setBadHabitsAllowed,
  setPropertyType,
  setOwnerType,
  setSelectedMapPoints,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;