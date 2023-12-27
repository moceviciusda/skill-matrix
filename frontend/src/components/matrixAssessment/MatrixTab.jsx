import {
  Button,
  Tab,
  VStack,
  Text,
  Progress,
  HStack,
  Heading,
} from '@chakra-ui/react';

import useCategoryProgress from '../../hooks/useCategoryProgress';

const MatrixTab = ({ category, assignmentData }) => {
  const { singleCheckProgress, fullCheckProgress, isLoading } =
    useCategoryProgress(category, assignmentData);

  if (isLoading) return <>Loading</>;

  return (
    <Button as={Tab} variant='ghost' size='xl' whiteSpace='normal'>
      <VStack flex={1}>
        <Heading size='sm' textTransform='capitalize'>
          {category.name}
        </Heading>
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
        <HStack justify='space-around' width='100%'>
          <Text>{+(fullCheckProgress * 100).toFixed(1)}%</Text>
          <Text>{+(singleCheckProgress * 100).toFixed(1)}%</Text>
        </HStack>
      </VStack>
    </Button>
  );
};

export default MatrixTab;
