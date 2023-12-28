import {
  Button,
  HStack,
  Heading,
  Progress,
  Td,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import AssigneeList from './AssigneeList';
import { MdAssignmentAdd } from 'react-icons/md';
import { FaClone, FaEdit, FaShare, FaTrash } from 'react-icons/fa';
import NavItem from '../navBar/NavItem';
import { useDeleteMatrixMutation } from '../../slices/matrixApiSlice';
import { useGetAssignmentsQuery } from '../../slices/assignmentsAPISlice';

const MatrixTableRow = ({ matrix }) => {
  const [deleteMatrix] = useDeleteMatrixMutation();
  const { data, isLoading } = useGetAssignmentsQuery({ matrixId: matrix._id });

  if (isLoading) return <></>;

  return (
    <Tr key={matrix._id}>
      <Td>
        <Heading size='sm'>{matrix.name}</Heading>
      </Td>
      <Td>
        <AssigneeList assignments={data} isLoading={isLoading} />
      </Td>
      <Td>
        <Progress value={50} isAnimated hasStripe borderRadius='full' />
      </Td>
      <Td>Some stats</Td>
      <Td>
        <HStack wrap='wrap' gap={0}>
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
          >
            <FaEdit />
          </NavItem>

          <Tooltip label='Delete' borderRadius='8px'>
            <Button
              variant='ghost'
              colorScheme='red'
              borderRadius='full'
              onClick={() => deleteMatrix(matrix._id)}
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
