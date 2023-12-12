import { Flex, Heading, VStack, Wrap } from '@chakra-ui/react';
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
    <VStack bg='gray.100'>
      <Heading size='lg'>Assigned to me</Heading>
      <Wrap justify='center'>
        {!userAssLoading &&
          userAssignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
      </Wrap>
      <Heading size='lg'>Assigned by me</Heading>
      <Wrap justify='center'>
        {!assByUserLoading &&
          assignedByUser.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
      </Wrap>
    </VStack>
  );
};

export default AssignmentsScreen;
