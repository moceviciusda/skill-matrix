import {
  Button,
  HStack,
  Heading,
  Progress,
  Td,
  Tooltip,
  Tr,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import AssigneeList from './AssigneeList';
import { MdAssignmentAdd } from 'react-icons/md';
import { FaClone, FaEdit, FaShare, FaTrash } from 'react-icons/fa';
import NavItem from '../navBar/NavItem';
import { useDeleteMatrixMutation } from '../../slices/matrixApiSlice';
import { useGetAssignmentsQuery } from '../../slices/assignmentsAPISlice';
import { toast } from 'react-toastify';
import MatrixStats from './MatrixStats';

const MatrixTableRow = ({ matrix }) => {
  const [deleteMatrix] = useDeleteMatrixMutation();
  const { data, isLoading } = useGetAssignmentsQuery({ matrixId: matrix._id });

  const { colorMode } = useColorMode();

  const deleteMatrixHandler = async () => {
    try {
      await deleteMatrix(matrix._id);
      toast.success(`Matrix ${matrix.name} deleted `);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (isLoading) return <></>;

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
        <Heading size='sm' textTransform='capitalize'>
          {matrix.name}
        </Heading>
      </Td>
      <Td textAlign='center'>
        <AssigneeList assignments={data} isLoading={isLoading} />
      </Td>
      <Td textAlign='center'>
        <Progress
          value={50}
          isAnimated
          hasStripe
          colorScheme='purple'
          borderRadius='full'
        />
      </Td>
      <Td textAlign='center'>
        <MatrixStats matrix={matrix} assignments={data} isLoading={isLoading} />
      </Td>

      <Td>
        <HStack wrap='wrap' justify='flex-end' gap={0}>
          <Tooltip label='Assign' borderRadius='8px'>
            <Button variant='ghost' colorScheme='purple' borderRadius='full'>
              <MdAssignmentAdd />
            </Button>
          </Tooltip>

          <Tooltip label='Share' borderRadius='8px'>
            <Button variant='ghost' colorScheme='purple' borderRadius='full'>
              <FaShare />
            </Button>
          </Tooltip>

          <Tooltip label='Clone' borderRadius='8px'>
            <Button variant='ghost' colorScheme='purple' borderRadius='full'>
              <FaClone />
            </Button>
          </Tooltip>

          <NavItem
            to={`/builder/${matrix._id}`}
            borderRadius='full'
            colorScheme='purple'
            label='Edit'
          >
            <FaEdit />
          </NavItem>

          <Tooltip label='Delete' borderRadius='8px'>
            <Button
              variant='ghost'
              colorScheme='red'
              borderRadius='full'
              onClick={deleteMatrixHandler}
            >
              <FaTrash />
            </Button>
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
};

export default MatrixTableRow;
