import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipSlice = createApi({
  reducerPath: "ipSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: builder => ({
    getIpData: builder.query({
      query: data => ({
        url: "https://geo.ipify.org/api/v2/country,city",
        params: {
          apiKey: "at_ABlZ5bcjMpJ3xBZHPSJ5tVjOurkvo",
          ipAddress: data,
        },
      }),
    }),
    getMyIpData: builder.query({
      query: () => ({
        url: "http://www.geoplugin.net/json.gp",
        params: {
          callback: "?",
        },
      }),
    }),
  }),
});

const ipReducer = createSlice({
  name: "ipReducer",
  initialState: { loading: false, result: {}, error: {}, isError: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(ipSlice.endpoints.getIpData.matchPending, state => {
        state.loading = true;
      })
      .addMatcher(ipSlice.endpoints.getIpData.matchFulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addMatcher(ipSlice.endpoints.getIpData.matchRejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default ipReducer.reducer;
export const { useLazyGetIpDataQuery, useLazyGetMyIpDataQuery } = ipSlice;
