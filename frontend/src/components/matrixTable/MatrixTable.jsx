import {
  Button,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import NavItem from '../navBar/NavItem';

const MatrixTable = ({ matrixList }) => {
  return (
    <TableContainer w={{ base: '100%', xl: '1280px' }} justifySelf='center'>
      <Table colorScheme='purple' size='sm' layout='fixed'>
        <TableCaption placement='top'>
          <Heading size='lg'>My Matrices</Heading>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Assignees</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {matrixList.map((matrix) => (
            <Tr key={matrix._id}>
              <Td>
                <Heading size='sm'>{matrix.name}</Heading>
              </Td>
              <Td>
                <Heading size='sm'>{matrix.name}</Heading>
              </Td>
              {/* <Td> */}
              <HStack as={Td} justify='flex-end' wrap='wrap'>
                <NavItem to={`/builder/${matrix._id}`} size='sm'>
                  Edit
                </NavItem>
                <Button size='sm'>Clone</Button>
                <Button size='sm'>Share</Button>
                <Button size='sm'>Delete</Button>
              </HStack>
              {/* </Td> */}
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default MatrixTable;
