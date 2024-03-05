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
import MatrixHistory from './MatrixHistory';
import useCloneMatrix from '../../hooks/matrix/useCloneMatrix';
import useCloneCompetence from '../../hooks/matrix/useCloneCompetence';
import clone from 'nodemon/lib/utils/clone';

const MatrixTableRow = ({ matrix }) => {
  const { data, isLoading } = useGetAssignmentsQuery({ matrixId: matrix._id });
  const { colorMode } = useColorMode();

  const [deleteMatrix] = useDeleteMatrixMutation();

  const deleteMatrixHandler = async () => {
    try {
      await deleteMatrix(matrix._id);
      toast.success(`Matrix ${matrix.name} deleted `);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [cloneMatrix] = useCloneMatrix(matrix);

  const cloneMatrixHandler = async () => {
    try {
      await cloneMatrix();
      toast.success(`Matrix ${matrix.name} cloned `);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const [cloneCompetence] = useCloneCompetence();

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
        <MatrixHistory
          matrix={matrix}
          assignments={data}
          isLoading={isLoading}
        />
      </Td>

      <Td>
        <HStack wrap='wrap' justify='flex-end' gap={0}>
          <Tooltip label='Assign' borderRadius='8px'>
            <Button variant='ghost' colorScheme='purple' borderRadius='full'>
              <MdAssignmentAdd />
            </Button>
          </Tooltip>

          <Tooltip label='Share' borderRadius='8px'>
            <Button
              variant='ghost'
              colorScheme='purple'
              borderRadius='full'
              onClick={() => {
                cloneCompetence('658b533a80e7d8e00ca45583');
              }}
            >
              <FaShare />
            </Button>
          </Tooltip>

          <Tooltip label='Clone' borderRadius='8px'>
            <Button
              variant='ghost'
              colorScheme='purple'
              borderRadius='full'
              onClick={cloneMatrixHandler}
            >
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
