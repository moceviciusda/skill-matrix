import { Box, Progress, Text, VStack } from '@chakra-ui/react';
import Skill from './Skill';
import { useParams } from 'react-router-dom';
import { useGetAssignmentQuery } from '../../slices/assignmentsAPISlice';

const SkillGroup = ({ skills }) => {
  const { id: assignmentId } = useParams();
  const { data: assignmentData } = useGetAssignmentQuery(assignmentId);

  const totalWeight = skills.reduce((acc, skill) => acc + skill.weight, 0);

  const singleCheckWeight = skills.reduce((acc, skill) => {
    const assSkill = assignmentData.skills.find((s) => s.id === skill.skillId);
    if (assSkill?.assigneeChecked || assSkill?.assignerChecked)
      acc += skill.weight;
    return acc;
  }, 0);

  const fullCheckWeight = skills.reduce((acc, skill) => {
    const assSkill = assignmentData.skills.find((s) => s.id === skill.skillId);
    if (assSkill?.assigneeChecked && assSkill?.assignerChecked)
      acc += skill.weight;
    return acc;
  }, 0);

  return (
    <Box flex={1}>
      {/* <HStack gap='2px' flexGrow={1} padding={2}> */}
      <Progress
        size='lg'
        variant='multiSegment'
        min={0}
        max={100}
        values={{
          green: (fullCheckWeight / totalWeight) * 100,
          yellow: ((singleCheckWeight - fullCheckWeight) / totalWeight) * 100,
        }}
        borderRadius='full'
        flex={1}
      />

      <Text>
        {(fullCheckWeight / totalWeight) * 100} %{' '}
        {(singleCheckWeight / totalWeight) * 100} %{' '}
      </Text>
      {/* </HStack> */}

      <VStack flex={1} gap='1px'>
        {skills.map((skill) => (
          <Skill key={skill.skillId} skill={skill} />
        ))}
      </VStack>
    </Box>
  );
};

export default SkillGroup;
