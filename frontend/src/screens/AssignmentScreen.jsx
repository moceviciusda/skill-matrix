import { useParams } from 'react-router-dom';
import MatrixBuilder from '../components/matrixBuilder/MatrixBuilder';
import {
  useGetMatricesQuery,
  useGetMatrixQuery,
} from '../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import NavItem from '../components/navBar/NavItem';
import { useGetAssignmentQuery } from '../slices/assignmentsAPISlice';
import MatrixAssessmentView from '../components/matrixAssessment/MatrixAssessmentView';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  HStack,
  Heading,
  VStack,
} from '@chakra-ui/react';
import AssignmentHeader from '../components/assignments/AssignmentHeader';

const AssignmentScreen = () => {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAssignmentQuery(id);

  if (isLoading) return <>Loading...</>;

  if (![data?.assignee, data?.assignedBy].includes(userInfo._id))
    return <>Unauthorized</>;

  return (
    <Card size='lg'>
      <CardHeader>
        <AssignmentHeader assignment={data} />
      </CardHeader>

      <CardBody pt={0}>
        <MatrixAssessmentView matrixId={data.matrixId} />
      </CardBody>
    </Card>
  );
};

export default AssignmentScreen;
