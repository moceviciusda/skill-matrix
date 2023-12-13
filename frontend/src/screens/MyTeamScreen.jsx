import React from 'react';
import Hero from '../components/Hero';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import UserCard from '../components/myTeam/UserCard';
import { Flex, HStack, Heading, VStack } from '@chakra-ui/react';

const MyTeamScreen = () => {
  const { data, isLoading } = useGetUserProfileQuery();

  return (
    <HStack justify='center'>
      <Flex direction='column' gap={2}>
        <Heading>{isLoading ? 'My Team' : data?.teamName}</Heading>
        {!isLoading &&
          data.teamMembers.map((id) => <UserCard key={id} userId={id} />)}
      </Flex>
    </HStack>
  );
};
export default MyTeamScreen;
