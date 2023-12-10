import SkillGroup from './SkillGroup';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';
import Loader from '../Loader';
import {
  FaWeightHanging,
  FaTrashAlt,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import SetWeightButton from './SetWeightButton';
import {
  Text,
  useDisclosure,
  Box,
  Button,
  Collapse,
  HStack,
  Card,
  CardHeader,
  CardBody,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';

const Competence = ({
  competence,
  removeCompetenceHandler,
  submitWeightHandler,
}) => {
  const { data, isLoading } = useGetCompetenceQuery(competence.competenceId);
  const { isOpen, onToggle } = useDisclosure();

  if (isLoading) return <Loader />;

  return (
    <Card w='100%'>
      <Button
        as='div'
        cursor='pointer'
        p={6}
        colorScheme='purple'
        onClick={onToggle}
        borderBottomRadius={!isOpen ? 0 : 6}
        rightIcon={!isOpen ? <FaChevronUp /> : <FaChevronDown />}
      >
        <HStack gap='2px' flexGrow={1}>
          <Text textTransform='capitalize'>{data.name}</Text>
          <Spacer />
          <SetWeightButton
            size={20}
            onSubmit={submitWeightHandler}
            obj={competence}
          />
          <IconButton
            icon={<IoClose size={20} />}
            isRound={true}
            variant='ghost'
            onClick={() => removeCompetenceHandler(competence)}
          />
        </HStack>
      </Button>
      <CardBody p={0}>
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
      </CardBody>
    </Card>
  );
};

export default Competence;
