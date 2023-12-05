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
      query: (id, data) => ({
        url: `${SKILLS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getSkill: builder.query({
      query: (id) => ({
        url: `${SKILLS_URL}/${id}`,
        method: 'GET',
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `${SKILLS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    getSkills: builder.query({
      query: (queryParams) => ({
        url: `${SKILLS_URL}?${new URLSearchParams(queryParams).toString()}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useGetSkillQuery,
  useDeleteSkillMutation,
  useGetSkillsQuery,
} = skillsApiSlice;
