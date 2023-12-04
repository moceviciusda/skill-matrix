import { apiSlice } from './apiSlice';
const COMPETENCES_URL = '/api/competences';

export const competencesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompetence: builder.mutation({
      query: (data) => ({
        url: `${COMPETENCES_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateCompetence: builder.mutation({
      query: (data) => ({
        url: `${COMPETENCES_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateCompetenceLevels: builder.mutation({
      query: (data) => ({
        url: `${COMPETENCES_URL}/${data.id}/levels`,
        method: 'PUT',
        body: data,
      }),
    }),
    getCompetence: builder.query({
      query: (queryParams) => ({
        url: `${COMPETENCES_URL}?${new URLSearchParams(
          queryParams
        ).toString()}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCompetenceMutation,
  useUpdateCompetenceMutation,
  useUpdateCompetenceLevelsMutation,
  useGetCompetenceQuery,
} = competencesApiSlice;
