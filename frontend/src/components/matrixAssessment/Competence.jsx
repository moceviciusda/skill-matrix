import {
  Card,
  CardBody,
  Button,
  HStack,
  Text,
  Box,
  Collapse,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import BuilderSkillGroup from '../matrixBuilder/BuilderSkillGroup';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';
import SetWeightButton from '../matrixBuilder/SetWeightButton';
import SkillGroup from './SkillGroup';
import WeightTag from './WeightTag';

const Competence = ({ competence }) => {
  const { isOpen, onToggle } = useDisclosure();

  const { data, isLoading } = useGetCompetenceQuery(competence.competenceId);

  if (isLoading) return <>Loading...</>;

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
        <HStack flex='1'>
          <Text textTransform='capitalize'>{data.name}</Text>
          <Spacer />
          <WeightTag weight={competence.weight} header='Competence Weight' />
        </HStack>
      </Button>

      <Box as={Collapse} in={!isOpen} animateOpacity p={2}>
        <HStack alignItems='flex-start' flexWrap='wrap'>
          {Object.keys(data.levels).map(
            (level) =>
              level !== '_id' && (
                <SkillGroup
                  competenceId={data._id}
                  key={data._id + level}
                  skills={data.levels[level]}
                  title={level}
                />
              )
          )}
        </HStack>
      </Box>
    </Card>
  );
};

export default Competence;