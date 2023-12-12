import { apiSlice } from './apiSlice';
const ASSIGNMENTS_URL = '/api/assignments';

export const assignmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAssignment: builder.mutation({
      query: (data) => ({
        url: `${ASSIGNMENTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAssignment: builder.mutation({
      query: ([data, id]) => ({
        url: `${ASSIGNMENTS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Assignments'],
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `${ASSIGNMENTS_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Assignments'],
    }),
    getAssignments: builder.query({
      query: (queryParams) => ({
        url: `${ASSIGNMENTS_URL}?${new URLSearchParams(
          queryParams
        ).toString()}`,
        method: 'GET',
      }),
      providesTags: ['Assignments'],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `${ASSIGNMENTS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
  useGetAssignmentQuery,
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} = assignmentsApiSlice;
