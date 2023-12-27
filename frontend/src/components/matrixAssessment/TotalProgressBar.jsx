import { HStack, Progress, Text } from '@chakra-ui/react';
import useTotalProgress from '../../hooks/useTotalProgress';

const TotalProgressBar = ({ matrixData, assignmentData }) => {
  const { singleCheckProgress, fullCheckProgress } = useTotalProgress(
    matrixData,
    assignmentData
  );

  return (
    <>
      <Progress
        borderRadius='full'
        variant='multiSegment'
        m={4}
        height={8}
        min={0}
        max={100}
        values={{
          green: fullCheckProgress * 100,
          yellow: (singleCheckProgress - fullCheckProgress) * 100,
        }}
      />
      <HStack justify='space-around'>
        <Text>{+(fullCheckProgress * 100).toFixed(1)}%</Text>
        <Text>{+(singleCheckProgress * 100).toFixed(1)}%</Text>
      </HStack>
    </>
  );
};

export default TotalProgressBar;
