import { apiSlice } from './apiSlice';
const MATRIX_URL = '/api/matrix';

export const matrixApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMatrix: builder.mutation({
      query: (data) => ({
        url: `${MATRIX_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateMatrix: builder.mutation({
      query: ([data, id]) => ({
        url: `${MATRIX_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Matrix'],
    }),
    getMatrix: builder.query({
      query: (id) => ({
        url: `${MATRIX_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Matrix'],
    }),
    getMatrices: builder.query({
      query: (queryParams) => ({
        url: `${MATRIX_URL}?${new URLSearchParams(queryParams).toString()}`,
        method: 'GET',
      }),
      providesTags: ['Matrix'],
    }),
  }),
});

export const {
  useCreateMatrixMutation,
  useUpdateMatrixMutation,
  useGetMatrixQuery,
  useGetMatricesQuery,
} = matrixApiSlice;
