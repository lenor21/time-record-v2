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
      invalidatesTags: ['Record'],
    }),

    timeOut: builder.mutation({
      query: (data) => ({
        url: `${RECORDS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Record'],
    }),
    recordToday: builder.query({
      query: () => ({
        url: `${RECORDS_URL}/today`,
        method: 'GET',
      }),
      providesTags: ['Record'],
    }),
  }),
});

export const { useTimeInMutation, useRecordTodayQuery, useTimeOutMutation } =
  recordsApiSlice;
