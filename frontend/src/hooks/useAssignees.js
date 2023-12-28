import { useGetUserQuery } from '../slices/usersApiSlice';

const useAssignees = (assignments) => {
  let assignees = [];
  let isLoading = false;
  assignments?.forEach((assignment) => {
    const { data: assignee, isLoading: isAssigneeLoading } = useGetUserQuery(
      assignment.assignee
    );
    if (!assignees.includes(assignee)) assignees.push(assignee);
    isLoading = isAssigneeLoading;
  });

  return { assignees, isLoading };
};

export default useAssignees;
