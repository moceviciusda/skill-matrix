import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });
// http://localhost:9999/
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Skill', 'Competence', 'Matrix'],
  endpoints: (builder) => ({}),
});
