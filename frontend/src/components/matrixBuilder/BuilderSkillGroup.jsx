import { useState } from 'react';
import { FaWeightHanging } from 'react-icons/fa';
import BuilderSkill from './BuilderSkill';
import AddSkillForm from './AddSkillForm';
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

const BuilderSkillGroup = ({ competenceId, skills, title }) => {
  const [skillsState, setSkillsState] = useState(skills);

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  const { isOpen, onToggle } = useDisclosure();

  const removeSkillHandler = async (skillId) => {
    const newSkills = skillsState.filter((skill) => skill.skillId !== skillId);
    try {
      await updateCompetenceLevels([
        { [title]: newSkills },
        competenceId,
      ]).unwrap();
      toast.success(`Skill removed`);
      setSkillsState(newSkills);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitWeightHandler = async (e, skill) => {
    e.preventDefault();
    if (parseFloat(e.target.value) != skill.weight) {
      let body = skillsState.filter((s) => s.skillId !== skill.skillId);
      body.splice(
        skillsState.findIndex((s) => s.skillId === skill.skillId),
        0,
        { weight: e.target.value, skillId: skill.skillId }
      );

      try {
        const res = await updateCompetenceLevels([
          { [title]: body },
          competenceId,
        ]).unwrap();
        toast.success(`Skill weight set to: ${e.target.value}`);
        setSkillsState([...res.levels[title]]);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

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
            Sum: {skillsState.reduce((acc, skill) => acc + skill.weight, 0)}
          </Text>
        </HStack>
      </Button>

      <VStack flex={1} gap='1px'>
        {skillsState.map((skill) => (
          <BuilderSkill
            key={skill.skillId}
            skill={skill}
            removeSkillHandler={removeSkillHandler}
            submitWeightHandler={submitWeightHandler}
          />
        ))}

        {!isOpen && (
          <Button
            variant='outline'
            colorScheme='purple'
            width='100%'
            onClick={onToggle}
          >
            Add Skill
          </Button>
        )}
        {isOpen && (
          <Box
            as={Collapse}
            in={isOpen}
            animateOpacity
            width='100%'
            overflow='visible'
          >
            <AddSkillForm
              stateChanger={setSkillsState}
              skills={skillsState}
              competenceId={competenceId}
              title={title}
              toggle={onToggle}
            />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default BuilderSkillGroup;
