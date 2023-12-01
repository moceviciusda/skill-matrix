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
      query: () => ({
        url: `${SKILLS_URL}`,
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
