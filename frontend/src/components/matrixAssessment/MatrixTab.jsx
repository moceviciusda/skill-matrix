import { Tab, VStack, Text, Progress, HStack, Heading } from '@chakra-ui/react';

import useCategoryProgress from '../../hooks/useCategoryProgress';

const MatrixTab = ({ category, assignmentData }) => {
  const { singleCheckProgress, fullCheckProgress, isLoading } =
    useCategoryProgress(category, assignmentData);

  if (isLoading) return <>Loading</>;

  return (
    <Tab
      borderRadius={8}
      _selected={{
        bg: 'purple.100',
        boxShadow: '0px 4px 2px 1px var(--chakra-colors-purple-400)',
      }}
      _hover={{
        bg: 'purple.100',
        boxShadow: '0px 4px 2px 1px var(--chakra-colors-purple-400)',
      }}
      _active={{
        boxShadow: '0px 0px 4px -12px var(--chakra-colors-purple-400)',
      }}
    >
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
    </Tab>
  );
};

export default MatrixTab;
