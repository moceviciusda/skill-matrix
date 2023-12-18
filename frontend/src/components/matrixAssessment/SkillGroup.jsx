import { useState } from 'react';
import { FaWeightHanging } from 'react-icons/fa';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import Skill from './Skill';

const SkillGroup = ({ competenceId, skills, title }) => {
  return (
    <Box flex={1}>
      <Button
        justifyContent='space-between'
        colorScheme='gray'
        fontSize={16}
        width='100%'
        cursor='default'
      >
        <HStack gap='2px' flexGrow={1} paddingX={2}>
          <Text textTransform='capitalize'>{title}</Text>
          <Spacer />
          <FaWeightHanging />
          <Text>
            Sum: {skills.reduce((acc, skill) => acc + skill.weight, 0)}
          </Text>
        </HStack>
      </Button>

      <VStack flex={1} gap='1px'>
        {skills.map((skill) => (
          <Skill key={skill.skillId} skill={skill} />
        ))}
      </VStack>
    </Box>
  );
};

export default SkillGroup;
