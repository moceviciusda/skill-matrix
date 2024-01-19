import React from 'react';
import { useGetMatricesQuery } from '../../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import { Table, Tbody } from '@chakra-ui/react';
import MatrixComplianceListItem from './MatrixComplianceListItem';

const MatrixComplianceList = ({ user }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMatricesQuery({ ownerId: userInfo._id });

  if (isLoading) return <>Loading...</>;

  if (!data) return <>No matrices to assess. Create new matrix</>;

  return (
    <Table colorScheme='purple' size='sm'>
      <Tbody>
        {data.map((matrix) => (
          <MatrixComplianceListItem
            key={matrix._id}
            matrix={matrix}
            user={user}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default MatrixComplianceList;
