import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
} from '@chakra-ui/react';
import useAssignmentDetails from '../../hooks/useAssignmentDetails';

const AssignmentCard = ({ assignment }) => {
  const { matrix, assignedBy, isLoading } = useAssignmentDetails(assignment);

  if (isLoading) return <>loading</>;

  if (!matrix) return <>no matrix</>;

  return (
    <Card>
      <CardHeader>
        <Heading size='md' textTransform='capitalize'>
          {matrix.name}
        </Heading>
      </CardHeader>

      <CardBody>
        <Avatar size='xs' name={assignedBy?.name} />
        <Text as='span'>{assignedBy?.name || 'unknown'} </Text>
        <Text textTransform=''>{assignment.createdAt} </Text>
      </CardBody>

      <CardFooter>
        <Button>do</Button>
        <Button>submit</Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
