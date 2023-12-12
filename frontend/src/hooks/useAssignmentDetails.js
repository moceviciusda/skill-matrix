import { useGetMatrixQuery } from '../slices/matrixApiSlice';
import { useGetUserQuery } from '../slices/usersApiSlice';

const useAssignmentDetails = (assignment) => {
  const { data: matrix, isLoading: isMatrixLoading } = useGetMatrixQuery(
    assignment.matrixId
  );
  const { data: assignedBy, isLoading: isAssignedByLoading } = useGetUserQuery(
    assignment.assignedBy
  );

  return {
    matrix,
    assignedBy,
    isLoading: isMatrixLoading || isAssignedByLoading,
  };
};

export default useAssignmentDetails;
