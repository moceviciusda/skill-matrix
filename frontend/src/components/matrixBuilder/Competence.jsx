import SkillGroup from './SkillGroup';
import {
  useGetCompetenceQuery,
  useUpdateCompetenceMutation,
} from '../../slices/competenceApiSlice';
import { FaChevronDown, FaChevronUp, FaEdit } from 'react-icons/fa';
import SetWeightButton from './SetWeightButton';
import {
  Text,
  useDisclosure,
  Box,
  Button,
  Collapse,
  HStack,
  Card,
  CardBody,
  Spacer,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { useState } from 'react';

const Competence = ({
  competence,
  removeCompetenceHandler,
  submitWeightHandler,
}) => {
  const { data, isLoading } = useGetCompetenceQuery(competence.competenceId);
  const [updateCompetence] = useUpdateCompetenceMutation();
  const { isOpen, onToggle } = useDisclosure();
  const [editing, setEditing] = useState(false);

  const updateName = (e) => {
    e.target.value !== data.name &&
      updateCompetence([{ name: e.target.value }, competence.competenceId]);
    setEditing(false);
  };

  if (isLoading) return <></>;

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
          {editing ? (
            <Input
              border={0}
              _focusVisible={{ boxShadow: 'none', outline: 'none' }}
              autoFocus
              defaultValue={data.name}
              onBlur={(e) => updateName(e)}
              onKeyUp={(e) => e.key === 'Enter' && updateName(e)}
            />
          ) : (
            <>
              <Text textTransform='capitalize'>{data.name}</Text>
              <IconButton
                icon={<FaEdit />}
                isRound={true}
                variant='ghost'
                // colorScheme='purple'
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
              />
            </>
          )}

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
            onClick={(e) => {
              e.stopPropagation();
              removeCompetenceHandler(competence);
            }}
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
