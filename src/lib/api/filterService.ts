// src/lib/api/filterService.ts
import { get } from "./apiService";

export interface AddressType {
  id: number;
  parentid: number;
  haschild: boolean;
  atetypenamerus: string;
  atetypenamekaz: string;
  namerus: string;
  namekaz: string;
  children?: AddressType[];
}

export interface GenderState {
  id: number;
  name: string;
  code: string;
}

export interface RommatesState {
  id: number;
  name: string;
}

export interface AddressState {
  regionId: number | null;
  regionName: string;
  districtId: number | null;
  districtName: string;
  microDistrictId: number | null;
  microDistrictName: string;
}

export const getAddresses = async (parentId: number): Promise<AddressType[]> => {
  return get<AddressType[]>(`/address/get-children/${parentId}`);
};
