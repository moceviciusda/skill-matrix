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
import NavItem from '../navBar/NavItem';
import { useSelector } from 'react-redux';

const AssignmentCard = ({ assignment }) => {
  const { matrix, assignedBy, assignee, isLoading } =
    useAssignmentDetails(assignment);

  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <Text>loading</Text>;

  if (!matrix) return <Text>no matrix</Text>;

  return (
    <Card size='sm'>
      <CardHeader>
        <Heading size='md' textTransform='capitalize'>
          {matrix.name}
        </Heading>
      </CardHeader>

      <CardBody>
        {userInfo._id === assignedBy?._id ? (
          <>
            <Avatar size='xs' name={assignee?.name} />
            <Text as='span'>{assignee?.name || 'unknown'} </Text>
          </>
        ) : (
          <>
            <Avatar size='xs' name={assignedBy?.name} />
            <Text as='span'>{assignedBy?.name || 'unknown'} </Text>
          </>
        )}

        <Text textTransform=''>{assignment.createdAt} </Text>
      </CardBody>

      <CardFooter display='flex' gap={2}>
        <NavItem
          to={`/assignments/${assignment._id}`}
          variant='outline'
          colorScheme='purple'
        >
          open
        </NavItem>
        <Button colorScheme='purple'>submit</Button>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
