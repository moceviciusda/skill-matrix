import React from 'react';
import useAssignmentDetails from '../../hooks/useAssignmentDetails';
import {
  Avatar,
  Heading,
  Spacer,
  Text,
  Flex,
  Box,
  Wrap,
} from '@chakra-ui/react';

const AssignmentHeader = ({ assignment }) => {
  const { matrix, assignedBy, assignee, isLoading } =
    useAssignmentDetails(assignment);

  if (isLoading) return <>Loading</>;

  return (
    // <VStack>
    <Wrap spacing={12}>
      <Heading>{matrix?.name}</Heading>

      <Spacer />

      <Flex gap='2' alignItems='center' flexWrap='wrap' justify='flex-end'>
        <Heading size='md'>Assigned By:</Heading>
        <Avatar name={assignedBy?.name} />
        <Box>
          <Heading size='sm'>{assignedBy?.name}</Heading>
          <Text>{assignedBy?.role}</Text>
        </Box>
      </Flex>

      <Flex gap='2' alignItems='center' flexWrap='wrap' justify='flex-end'>
        <Heading size='md'>Assignee:</Heading>
        <Avatar name={assignee?.name} />
        <Box>
          <Heading size='sm'>{assignee?.name}</Heading>
          <Text>{assignee?.role}</Text>
        </Box>
      </Flex>
    </Wrap>

    //   <Progress size='lg' minW='80%' borderRadius={10} />
    // </VStack>
  );
};

export default AssignmentHeader;
