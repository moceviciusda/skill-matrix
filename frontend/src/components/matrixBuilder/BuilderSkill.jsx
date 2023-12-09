import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
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
  useColorModeValue,
} from '@chakra-ui/react';

const BuilderSkill = ({ skill, removeSkillHandler, submitWeightHandler }) => {
  const { data, isLoading } = useGetSkillQuery(skill.skillId);

  const colors = useColorModeValue('blackAlpha', 'gray');

  // const renderDescriptionPopover = (props) => (
  //   <Popover id={`${skill.skillId}-description`} {...props}>
  //     <Popover.Header>Skill Description</Popover.Header>
  //     <Popover.Body>{data.description}</Popover.Body>
  //   </Popover>
  // );

  if (isLoading) return <></>;

  return (
    <Card variant='outline' width='100%'>
      <CardHeader paddingX={2} pt={2} pb={0}>
        <Text>{data.summary}</Text>
      </CardHeader>
      <CardBody p={1}>
        <HStack justify='flex-end' gap='2px'>
          {/* <OverlayTrigger
          placement='right'
          delay={{ show: 250, hide: 400 }}
          overlay={renderDescriptionPopover}
        > */}
          <SetWeightButton onSubmit={submitWeightHandler} obj={skill} />
          <IconButton
            icon={<FaInfoCircle />}
            isRound={true}
            variant='ghost'
            colorScheme={colors}
          />
          {/* </OverlayTrigger> */}

          <IconButton
            icon={<IoClose />}
            isRound={true}
            variant='ghost'
            colorScheme='red'
            onClick={() => removeSkillHandler(skill.skillId)}
          />
          {/* <IconButton
            icon={<FaTrashAlt />}
            isRound={true}
            variant='ghost'
            colorScheme='red'
            onClick={() => console.log(delete from DB)}
          /> */}
        </HStack>
      </CardBody>
    </Card>
  );
};

export default BuilderSkill;
