"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "./store";
import { parseCookies } from 'nookies';

// Базовый запрос с проверкой токена
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Попробуем получить токен из Redux
    let token;
    try {
      token = (getState() as RootState)?.user?.accessToken;
    } catch (e) {
      // Если не получилось, проверим куки
      if (typeof window !== 'undefined') {
        const cookies = parseCookies();
        token = cookies.accessToken;
      }
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Создаем API
export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Profile"],
});