"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddressState, GenderState, RommatesState } from "@/types/common";

export interface SearchBarState {
  address: AddressState;
  gender: GenderState | null;
  roommates: RommatesState | null;
  priceRange: number[];
}

export const initialState: SearchBarState = {
  address: {
    regionId: 1,
    regionName: "Весь Казахстан",
    districtId: null,
    districtName: "",
    microDistrictId: null,
    microDistrictName: "",
  },
  gender: null,
  roommates: null,
  priceRange: [0, 500000],
};

const searchBarSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state.address = action.payload;
    },
    setRegion: (state, action: PayloadAction<{ id: number | null; name: string }>) => {
      if (state.address) {
        state.address.regionId = action.payload.id;
        state.address.regionName = action.payload.name;
        // Reset district and microdistrict when region changes
        state.address.districtId = null;
        state.address.districtName = "";
        state.address.microDistrictId = null;
        state.address.microDistrictName = "";
      }
    },
    setDistrict: (state, action: PayloadAction<{ id: number | null; name: string }>) => {
      if (state.address) {
        state.address.districtId = action.payload.id;
        state.address.districtName = action.payload.name;
        // Reset microdistrict when district changes
        state.address.microDistrictId = null;
        state.address.microDistrictName = "";
      }
    },
    setMicroDistrict: (state, action: PayloadAction<{ id: number | null; name: string }>) => {
      if (state.address) {
        state.address.microDistrictId = action.payload.id;
        state.address.microDistrictName = action.payload.name;
      }
    },
    setGender: (state, action: PayloadAction<GenderState | null>) => {
      state.gender = action.payload;
    },
    setRoommates: (state, action: PayloadAction<RommatesState | null>) => {
      state.roommates = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.address = initialState.address;
      state.gender = initialState.gender;
      state.roommates = initialState.roommates;
      state.priceRange = initialState.priceRange;
    },
  },
});

export const {
  setAddress,
  setRegion,
  setDistrict,
  setMicroDistrict,
  setGender,
  setRoommates,
  setPriceRange,
  resetFilters,
} = searchBarSlice.actions;

export default searchBarSlice.reducer;
