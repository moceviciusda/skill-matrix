import {
  Button,
  ButtonGroup,
  Heading,
  Progress,
  Td,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import { useCreateAssignmentMutation } from '../../slices/assignmentsAPISlice';
import { toast } from 'react-toastify';

const MatrixComplianceListItem = ({ user, matrix }) => {
  const [createAssignment, { isLoading }] = useCreateAssignmentMutation();

  const { colorMode } = useColorMode();

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
    <Tr
      paddingX={0}
      _hover={{
        bg:
          colorMode === 'dark'
            ? 'var(--chakra-colors-purple-800)'
            : 'var(--chakra-colors-purple-50)',
      }}
    >
      <Td>
        <Heading size='sm'>{matrix.name}</Heading>
      </Td>
      <Td>
        <Progress
          flex='1'
          hasStripe
          isIndeterminate
          colorScheme='green'
          variant='outline'
          minW='200px'
          borderRadius='28px'
        />
      </Td>
      <Td>
        <ButtonGroup variant='ghost' colorScheme='purple' size='sm'>
          <Button onClick={assignMatrixHandler} isLoading={isLoading}>
            Assign
          </Button>
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

export default MatrixComplianceListItem;
