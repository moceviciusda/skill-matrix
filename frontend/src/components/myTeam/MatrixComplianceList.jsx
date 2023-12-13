import React from 'react';
import { useGetMatricesQuery } from '../../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import { VStack } from '@chakra-ui/react';
import MatrixComplianceListItem from './MatrixComplianceListItem';

const MatrixComplianceList = ({ userSkills }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMatricesQuery({ ownerId: userInfo._id });

  if (isLoading) return <>Loading...</>;

  if (!data) return <>No matrices to assess. Create new matrix</>;

  return (
    <VStack gap='0' alignItems='stretch'>
      {data.map((matrix) => (
        <MatrixComplianceListItem
          key={matrix._id}
          matrix={matrix}
          userSkills={userSkills.filter((skill) => skill.approvedBy)}
        />
      ))}
    </VStack>
  );
};

export default MatrixComplianceList;
