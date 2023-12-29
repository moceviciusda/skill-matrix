import { useParams } from 'react-router-dom';
import MatrixBuilder from '../components/matrixBuilder/MatrixBuilder';
import { useGetMatricesQuery } from '../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import MatrixTable from '../components/matrixTable/MatrixTable';

const MatrixBuilderScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetMatricesQuery({ ownerId: userInfo._id });

  if (id) return <MatrixBuilder matrixId={id} />;
  else if (isLoading) return <>Loading...</>;
  else
    return (
      <Flex justify='center'>
        <MatrixTable matrixList={data} />
      </Flex>
    );
};

export default MatrixBuilderScreen;
