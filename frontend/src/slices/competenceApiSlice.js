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
      providesTags: ['Competence'],
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
      providesTags: ['Competence'],
    }),
    updateCompetence: builder.mutation({
      query: ([data, id]) => ({
        url: `${COMPETENCES_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Competence'],
    }),
    updateCompetenceLevels: builder.mutation({
      query: ([data, id]) => ({
        url: `${COMPETENCES_URL}/${id}/levels`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Competence'],
    }),
  }),
});

export const {
  useCreateCompetenceMutation,
  useGetCompetenceQuery,
  useLazyGetCompetenceQuery,
  useGetCompetencesQuery,
  useUpdateCompetenceMutation,
  useUpdateCompetenceLevelsMutation,
  useDeleteCompetenceMutation,
} = competencesApiSlice;
