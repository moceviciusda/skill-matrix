import {
  Avatar,
  Card,
  CardHeader,
  CardBody,
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
import MatrixComplianceList from './MatrixComplianceList';

const UserCard = ({ userId }) => {
  const { data, isLoading } = useGetUserQuery(userId);

  if (isLoading) return <>Loading..</>;

  if (!data) return null;

  return (
    <Card variant='outline' size='sm'>
      <CardHeader>
        <Flex gap='4' alignItems='center'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar size='md' name={data?.name} />
            <Box>
              <Heading size='sm'>{data?.name}</Heading>
              <Text>{data?.role}</Text>
            </Box>
          </Flex>
          <ButtonGroup flexWrap='wrap' variant='ghost'>
            <Button>View Skills</Button>
            <Button>Grow Plan</Button>
          </ButtonGroup>
        </Flex>
      </CardHeader>

      <CardBody p={0}>
        <MatrixComplianceList user={data} />
      </CardBody>

      {/* <CardFooter></CardFooter> */}
    </Card>
  );
};

export default UserCard;
