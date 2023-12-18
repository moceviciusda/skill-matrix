import { useGetMatrixQuery } from '../slices/matrixApiSlice';
import { useGetUserQuery } from '../slices/usersApiSlice';

const useAssignmentDetails = (assignment) => {
  const { data: matrix, isLoading: isMatrixLoading } = useGetMatrixQuery(
    assignment.matrixId
  );
  const { data: assignedBy, isLoading: isAssignedByLoading } = useGetUserQuery(
    assignment.assignedBy
  );
  const { data: assignee, isLoading: isAssigneeLoading } = useGetUserQuery(
    assignment.assignee
  );

  return {
    matrix,
    assignedBy,
    assignee,
    isLoading: isMatrixLoading || isAssignedByLoading || isAssigneeLoading,
  };
};

export default useAssignmentDetails;
