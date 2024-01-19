import {
  CircularProgress,
  CircularProgressLabel,
  HStack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import useTotalProgress from '../../hooks/useTotalProgress';

const MatrixStats = ({ matrix, assignments, isLoading }) => {
  const completedAssignments = assignments.filter(
    (assignment) => assignment.approved
  );

  const totalProgressArray = completedAssignments.map((assignment) => {
    const { fullCheckProgress } = useTotalProgress(matrix, assignment);
    return fullCheckProgress;
  });

  const averageTotalProgress =
    (totalProgressArray.reduce((acc, progress) => acc + progress, 0) /
      totalProgressArray.length) *
    100;

  if (isLoading) return <>Loading...</>;

  return (
    <HStack justify='space-between' mr='-32px'>
      <VStack>
        <Text flex={1}>{`Assigned: ${assignments.length}`}</Text>
        <Text flex={1}>{`Completed: ${completedAssignments.length}`}</Text>
      </VStack>

      <Wrap justify='center' align='center' flex={1}>
        <Text>Average:</Text>
        <CircularProgress
          size='2.5rem'
          thickness='12px'
          // isIndeterminate={!completedAssignments.length}
          value={averageTotalProgress || 0}
          color='purple.400'
        >
          <CircularProgressLabel fontSize='12px'>
            {averageTotalProgress ? `${averageTotalProgress.toFixed(1)}%` : ''}
          </CircularProgressLabel>
        </CircularProgress>
      </Wrap>
    </HStack>
  );
};

export default MatrixStats;
