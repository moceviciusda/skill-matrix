import { Box, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import Skill from './Skill';
import { useParams } from 'react-router-dom';
import { useGetAssignmentQuery } from '../../slices/assignmentsAPISlice';
import useCompetenceProgress from '../../hooks/useCompetenceProgress';

const SkillGroup = ({ competenceId, skills }) => {
  const { id: assignmentId } = useParams();
  const { data: assignmentData } = useGetAssignmentQuery(assignmentId);

  const { singleCheckProgress, fullCheckProgress } = useCompetenceProgress(
    competenceId,
    assignmentData
  );

  return (
    <Box flex={1}>
      <VStack flex={1} gap='1px'>
        {skills.map((skill) => (
          <Skill key={skill.skillId} skill={skill} />
        ))}
      </VStack>
      <Progress
        mt={4}
        size='lg'
        variant='multiSegment'
        min={0}
        max={100}
        values={{
          green: fullCheckProgress * 100,
          yellow: (singleCheckProgress - fullCheckProgress) * 100,
        }}
        borderRadius='full'
        flex={1}
      />
      <HStack justify='space-around'>
        <Text>{+(fullCheckProgress * 100).toFixed(1)} %</Text>
        <Text>{+(singleCheckProgress * 100).toFixed(1)} %</Text>
      </HStack>
    </Box>
  );
};

export default SkillGroup;
