
import { api } from "@/store/api";
import type { Response } from "@/types/response/response";
import { AddressType, Card } from "@/types/common";
  
  export const landingApi = api.injectEndpoints({
    endpoints: (build) => ({
      getAddresses: build.query<Response<AddressType[]>, number>({
        query: (parentId) => ({
          url: `/address/get-children/${parentId}`,
          method: "GET",
        }),
      }),

      getGreatDeals: build.query<Response<Card[]>, void>({
        query: () => ({
          url: `/announcement/great-deals`,
          method: "GET",
        }),
      }),
    }),
  });
  
  export const { useGetAddressesQuery, useLazyGetAddressesQuery, useGetGreatDealsQuery, useLazyGetGreatDealsQuery } = landingApi;