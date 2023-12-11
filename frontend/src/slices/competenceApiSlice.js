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
    getCompetence: builder.query({
      query: (id) => ({
        url: `${COMPETENCES_URL}/${id}`,
        method: 'GET',
      }),
    }),
    deleteCompetence: builder.mutation({
      query: (id) => ({
        url: `${COMPETENCES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    getCompetences: builder.query({
      query: (queryParams) => ({
        url: `${COMPETENCES_URL}?${new URLSearchParams(
          queryParams
        ).toString()}`,
        method: 'GET',
      }),
    }),
    updateCompetence: builder.mutation({
      query: ([data, id]) => ({
        url: `${COMPETENCES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    updateCompetenceLevels: builder.mutation({
      query: ([data, id]) => ({
        url: `${COMPETENCES_URL}/${id}/levels`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCompetenceMutation,
  useGetCompetenceQuery,
  useGetCompetencesQuery,
  useUpdateCompetenceMutation,
  useUpdateCompetenceLevelsMutation,
  useDeleteCompetenceMutation,
} = competencesApiSlice;
