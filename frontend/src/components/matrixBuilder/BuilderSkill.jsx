import { FaEdit, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useGetSkillQuery } from '../../slices/skillsApiSlice';
import SetWeightButton from './SetWeightButton';
import {
  Card,
  CardBody,
  HStack,
  Text,
  IconButton,
  CardHeader,
  Spacer,
} from '@chakra-ui/react';
import InfoHoverIcon from '../InfoHoverIcon';

const BuilderSkill = ({ skill, removeSkillHandler, submitWeightHandler }) => {
  const { data, isLoading } = useGetSkillQuery(skill.skillId);

  if (isLoading) return <></>;

  return (
    <Card variant='outline' width='100%' height='100%' justify='flex-end'>
      <CardHeader paddingX={2} pt={2} pb={0}>
        <Text>{data.summary}</Text>
      </CardHeader>
      <CardBody p={1} display='flex'>
        <HStack justify='flex-end' gap='2px' flexGrow='1' align='flex-end'>
          <IconButton
            icon={<FaEdit />}
            isRound={true}
            variant='ghost'
            // colorScheme='red'
            onClick={() => console.log('Edit in DB')}
          />
          <IconButton
            icon={<FaTrashAlt />}
            isRound={true}
            variant='ghost'
            colorScheme='red'
            onClick={() => console.log('delete from DB')}
          />

          <Spacer />

          <SetWeightButton
            onSubmit={submitWeightHandler}
            obj={skill}
            header='Skill Weight'
            body='Used to determine importance of skill within competence. 
            Competence completion percentage is a ratio of 
            (weight sum of acquired skills) / (weight sum of all competence skills)'
          />
          <InfoHoverIcon
            icon={<FaInfoCircle />}
            header='Skill Description'
            body={data.description}
          />
          <IconButton
            icon={<IoClose />}
            isRound={true}
            variant='ghost'
            colorScheme='red'
            onClick={() => removeSkillHandler(skill.skillId)}
          />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default BuilderSkill;
