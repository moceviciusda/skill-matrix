import {
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import NewMatrixButton from './NewMatrixButton';
import MatrixTableRow from './MatrixTableRow';

const MatrixTable = ({ matrixList }) => {
  return (
    <TableContainer w={{ base: '100%', xl: '1280px' }} justifySelf='center'>
      <Table size='sm'>
        <TableCaption placement='top'>
          <Heading size='lg'>My Matrices</Heading>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Assignees</Th>
            <Th>Team Average</Th>
            <Th>Stats</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matrixList.map((matrix) => (
            <MatrixTableRow key={matrix._id} matrix={matrix} />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th textAlign='center' colSpan='100%'>
              <NewMatrixButton />
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default MatrixTable;
