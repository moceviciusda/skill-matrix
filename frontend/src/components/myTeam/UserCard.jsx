import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  VStack,
  Text,
  CardFooter,
  Button,
  ButtonGroup,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useGetUserQuery } from '../../slices/usersApiSlice';
import { CardBody } from 'react-bootstrap';
import MatrixComplianceList from './MatrixComplianceList';

const UserCard = ({ userId }) => {
  const { data, isLoading } = useGetUserQuery(userId);

  if (isLoading) return <>Loading..</>;

  if (!data) return null;

  return (
    <Card variant='outline'>
      <CardHeader>
        <Flex gap='4' alignItems='center'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar size='md' name={data?.name} />
            <Box>
              <Heading size='sm'>{data?.name}</Heading>
              <Text>{data?.role}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <MatrixComplianceList userSkills={data.skills} />
      </CardBody>

      <CardFooter>
        <ButtonGroup flexWrap='wrap'>
          <Button>New Assignment</Button>
          <Button>View Skills</Button>
          <Button>Grow Plan</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
