import {
  Card,
  Button,
  HStack,
  Text,
  Box,
  Collapse,
  Spacer,
  useDisclosure,
  Progress,
} from '@chakra-ui/react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';
import SkillGroup from './SkillGroup';
import WeightTag from './WeightTag';
import { useParams } from 'react-router-dom';
import { useGetAssignmentQuery } from '../../slices/assignmentsAPISlice';
import useCompetenceProgress from '../../hooks/useCompetenceProgress';

const Competence = ({ competence }) => {
  const { isOpen, onToggle } = useDisclosure();

  const { id: assignmentId } = useParams();
  const { data: assignmentData } = useGetAssignmentQuery(assignmentId);

  const { singleCheckProgress, fullCheckProgress } = useCompetenceProgress(
    competence.competenceId,
    assignmentData
  );

  const { data, isLoading } = useGetCompetenceQuery(competence.competenceId);

  if (isLoading || !data) return <>Loading...</>;

  return (
    <Card w='100%'>
      <Button
        w='100%'
        as='div'
        cursor='pointer'
        p={6}
        colorScheme='purple'
        onClick={onToggle}
        borderBottomRadius={!isOpen ? 0 : 6}
        rightIcon={!isOpen ? <FaChevronUp /> : <FaChevronDown />}
      >
        <HStack flex='1' alignItems='center'>
          <Text textTransform='capitalize'>{data.name}</Text>
          {/* <Progress
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
          /> */}
          <Spacer />
          <WeightTag weight={competence.weight} header='Competence Weight' />
        </HStack>
      </Button>

      <Box as={Collapse} in={!isOpen} animateOpacity p={2}>
        <SkillGroup
          competenceId={data._id}
          key={data._id}
          skills={data.skills}
        />
      </Box>
    </Card>
  );
};

export default Competence;
