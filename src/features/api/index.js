import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const username = 'coalition';
const password = 'skills-test';
const token = btoa(`${username}:${password}`);



// Define the API slice
export const api = createApi({
  reducerPath: 'api', // Unique key for this API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fedskillstest.coalitiontechnologies.workers.dev',
    prepareHeaders: (headers) => {
      // Add Basic Auth token to the Authorization header
      headers.set('Authorization', `Basic ${token}`);
      return headers;
    },
  }), // Base URL for API
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => '/', 
    }),
  }),
});

// Export the auto-generated hooks for the endpoints
export const { useGetDataQuery } = api;
