import { useGetMatricesQuery } from '../../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import { Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import MatrixComplianceListItem from './MatrixComplianceListItem';

const MatrixComplianceList = ({ user }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMatricesQuery({ ownerId: userInfo._id });

  if (isLoading) return <>Loading...</>;

  if (!data) return <>No matrices to assess. Create new matrix</>;

  return (
    <Table colorScheme='purple' size='sm'>
      <Thead>
        <Tr>
          <Td colSpan='100%' p={0} />
        </Tr>
      </Thead>
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
