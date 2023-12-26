import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAssignmentQuery } from '../slices/assignmentsAPISlice';
import MatrixAssessmentView from '../components/matrixAssessment/MatrixAssessmentView';
import { Card, CardBody, CardHeader, Flex } from '@chakra-ui/react';
import AssignmentHeader from '../components/assignments/AssignmentHeader';

const AssignmentScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAssignmentQuery(id);

  if (isLoading) return <>Loading...</>;

  if (![data?.assignee, data?.assignedBy].includes(userInfo._id))
    return <>Unauthorized</>;

  return (
    <Flex justify='center'>
      <Card size='lg' flexBasis={{ base: '100%', xl: '80%' }}>
        <CardHeader>
          <AssignmentHeader assignment={data} />
        </CardHeader>

        <CardBody p={0}>
          <MatrixAssessmentView
            matrixId={data.matrixId}
            assignmentData={data}
          />
        </CardBody>
      </Card>
    </Flex>
  );
};

export default AssignmentScreen;
