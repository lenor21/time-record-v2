import { apiSlice } from '../apiSlice';

const RECORDS_URL = '/api/records';

export const recordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    timeIn: builder.mutation({
      query: (data) => ({
        url: `${RECORDS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    recordToday: builder.query({
      query: () => ({
        url: `${RECORDS_URL}/today`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useTimeInMutation, useRecordTodayQuery } = recordsApiSlice;
