import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Progress,
} from '@chakra-ui/react';
import React from 'react';
import { useCreateAssignmentMutation } from '../../slices/assignmentsAPISlice';
import { toast } from 'react-toastify';

const MatrixComplianceListItem = ({ user, matrix }) => {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const assignMatrixHandler = async () => {
    try {
      await createAssignment({
        matrixId: matrix._id,
        assignee: user._id,
      }).unwrap();
      toast.success(`"${matrix.name}" assigned to ${user.name}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card flexDir='row' flexWrap='wrap' size='sm'>
      <CardHeader display='flex' alignItems='center' maxW='300px'>
        <Heading size='sm'>{matrix.name}</Heading>
      </CardHeader>
      <CardBody display='flex' alignItems='center'>
        <Progress
          flex='1'
          hasStripe
          isIndeterminate
          colorScheme='green'
          variant='outline'
          minW='200px'
          borderRadius='28px'
        />
      </CardBody>
      <CardFooter>
        <ButtonGroup variant='ghost' colorScheme='purple' size='sm'>
          <Button onClick={assignMatrixHandler} isLoading={isLoading}>
            Assign
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default MatrixComplianceListItem;
