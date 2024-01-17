import {
  Card,
  CardHeader,
  CardBody,
  HStack,
  Text,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { useGetSkillQuery } from '../../slices/skillsApiSlice';
import InfoHoverIcon from '../InfoHoverIcon';
import WeightTag from './WeightTag';
import { useParams } from 'react-router-dom';
import UserSwitch from './UserSwitch';
import {
  useGetAssignmentQuery,
  useLazyGetAssignmentQuery,
  useUpdateAssignmentMutation,
} from '../../slices/assignmentsAPISlice';
import useAssignmentDetails from '../../hooks/useAssignmentDetails';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Skill = ({ skill }) => {
  const { id: assignmentId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: assignmentData } = useGetAssignmentQuery(assignmentId, {
    pollingInterval: 5000,
  });
  const [getAssignment, { isLoading }] = useLazyGetAssignmentQuery();

  const [updateAssignment] = useUpdateAssignmentMutation();
  let assignmentSkill = assignmentData.skills.find(
    (s) => s.id === skill.skillId
  ) || {
    id: skill.skillId,
    comments: [],
    assigneeChecked: false,
    assingerChecked: false,
  };

  const { assignee, assignedBy } = useAssignmentDetails(assignmentData);

  const { data: skillData, isLoading: skillLoading } = useGetSkillQuery(
    skill.skillId
  );

  const switchChangeHandler = async (e) => {
    const newData = await getAssignment(assignmentId).unwrap();
    console.log(newData);

    assignmentSkill = newData.skills.find((s) => s.id === skill.skillId) || {
      id: skill.skillId,
      comments: [],
      assigneeChecked: false,
      assingerChecked: false,
    };

    const propertyName =
      assignmentData.assignee === userInfo._id
        ? 'assigneeChecked'
        : 'assignerChecked';

    try {
      await updateAssignment([
        {
          skills: [
            ...newData.skills.filter((s) => s.id !== assignmentSkill.id),
            {
              ...assignmentSkill,
              [propertyName]: !assignmentSkill[propertyName],
            },
          ],
        },
        assignmentId,
      ]);
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const successColors = useColorModeValue('green.100', 'green.700');
  const mismatchColors = useColorModeValue('yellow.100', 'yellow.700');
  let colors = '';
  if (assignmentSkill.assigneeChecked && assignmentSkill.assignerChecked) {
    colors = successColors;
  } else if (
    assignmentSkill.assigneeChecked ||
    assignmentSkill.assignerChecked
  ) {
    colors = mismatchColors;
  }

  if (skillLoading || isLoading) return <></>;

  return (
    <Card
      as='label'
      variant='outline'
      width='100%'
      cursor='pointer'
      bg={colors}
      htmlFor={userInfo._id + skill.skillId}
    >
      <CardHeader paddingX={2} pt={2} pb={0}>
        <Text>{skillData.summary}</Text>
      </CardHeader>
      <CardBody p={1}>
        <HStack justify='flex-end' gap='2px'>
          <UserSwitch
            key={`assigner${assignmentSkill?.assignerChecked}`}
            id={assignmentData.assignedBy + skill.skillId}
            user={assignedBy}
            isDisabled={userInfo._id !== assignmentData.assignedBy}
            defaultChecked={assignmentSkill?.assignerChecked}
            onChange={(e) => switchChangeHandler(e)}
          />
          <UserSwitch
            key={`assignee${assignmentSkill?.assigneeChecked}`}
            id={assignmentData.assignee + skill.skillId}
            user={assignee}
            isDisabled={userInfo._id !== assignmentData.assignee}
            defaultChecked={assignmentSkill?.assigneeChecked}
            onChange={(e) => switchChangeHandler(e)}
          />

          <Spacer />

          <WeightTag
            weight={skill.weight}
            header='Skill Weight'
            body='Used to determine importance of skill within level. 
            Competence level completion percentage is a ratio of 
            (weight sum of acquired skills) / (weight sum of skills within level)'
          />
          <InfoHoverIcon
            icon={<FaInfoCircle />}
            header='Skill Description'
            body={skillData.description}
          />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default Skill;
