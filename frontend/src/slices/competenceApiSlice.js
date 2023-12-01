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
    getCompetence: builder.query({
      query: (id) => ({
        url: `${COMPETENCES_URL}?_id=${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateCompetenceMutation,
  useUpdateCompetenceMutation,
  useGetCompetenceQuery,
} = competencesApiSlice;
