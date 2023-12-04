import { apiSlice } from './apiSlice';
const SKILLS_URL = '/api/skills';

export const skillsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSkill: builder.mutation({
      query: (data) => ({
        url: `${SKILLS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateSkill: builder.mutation({
      query: (data) => ({
        url: `${SKILLS_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getSkills: builder.query({
      query: (queryParams) => ({
        url: `${SKILLS_URL}?${new URLSearchParams(queryParams).toString()}`,
        method: 'GET',
      }),
    }),
    deleteSkill: builder.mutation({
      query: (data) => ({
        url: `${SKILLS_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useGetSkillsQuery,
  useDeleteSkillMutation,
} = skillsApiSlice;
