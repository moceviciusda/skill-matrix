import {
  Avatar,
  AvatarGroup,
  HStack,
  SkeletonCircle,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import useAssignees from '../../hooks/useAssignees';

const AssigneeList = ({ assignments, isLoading }) => {
  const { assignees, isLoading: isAssigneesLoading } =
    useAssignees(assignments);

  if (isLoading || isAssigneesLoading)
    return (
      <HStack gap={0}>
        <SkeletonCircle size='8' mr={-3} />
        <SkeletonCircle size='8' mr={-3} />
        <SkeletonCircle size='8' />
      </HStack>
    );

  const label = (
    <>
      {assignees.map((assignee, i) => (
        <Text key={assignee?._id + i + 'label'}>{assignee?.name}</Text>
      ))}
    </>
  );

  return (
    <Tooltip label={label} borderRadius='8px'>
      <AvatarGroup size='sm' max={2}>
        {assignees.map((assignee, i) => (
          <Avatar key={assignee?._id + i} name={assignee?.name} />
        ))}
      </AvatarGroup>
    </Tooltip>
  );
};

export default AssigneeList;
