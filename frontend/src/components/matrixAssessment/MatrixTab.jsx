import { Button, Tab, VStack, Text, Progress } from '@chakra-ui/react';

import useCategoryProgress from '../../hooks/useCategoryProgress';

const MatrixTab = ({ category, assignmentData }) => {
  const { singleCheckProgress, fullCheckProgress, isLoading } =
    useCategoryProgress(category, assignmentData);

  if (isLoading) return <>Loading</>;

  return (
    <Button as={Tab} variant='ghost' size='xl' whiteSpace='normal'>
      <VStack flex={1}>
        <Text>{category.name}</Text>
        <Progress
          size='lg'
          variant='multiSegment'
          min={0}
          max={100}
          values={{
            green: fullCheckProgress * 100,
            yellow: (singleCheckProgress - fullCheckProgress) * 100,
          }}
          borderRadius='full'
          w='100%'
        />
        <Text>
          {fullCheckProgress * 100} % {singleCheckProgress * 100} %{' '}
        </Text>
      </VStack>
    </Button>
  );
};

export default MatrixTab;
