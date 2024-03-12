import {
  Flex,
  HStack,
  Heading,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useGetAssignmentsQuery } from '../slices/assignmentsAPISlice';
import AssignmentCard from '../components/assignments/AssignmentCard';
import { useSelector } from 'react-redux';

const AssignmentsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: userAssignments, isLoading: userAssLoading } =
    useGetAssignmentsQuery({
      assignee: userInfo._id,
    });

  const { data: assignedByUser, isLoading: assByUserLoading } =
    useGetAssignmentsQuery({
      assignedBy: userInfo._id,
    });

  return (
    <HStack justifyContent='center' align='flex-start'>
      <VStack flex={1}>
        <Heading size='lg'>Assigned to me</Heading>
        {!userAssLoading &&
          userAssignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
      </VStack>
      <VStack flex={1}>
        <Heading size='lg'>Assigned by me</Heading>
        {!assByUserLoading &&
          assignedByUser.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
      </VStack>
    </HStack>
  );
};

export default AssignmentsScreen;
