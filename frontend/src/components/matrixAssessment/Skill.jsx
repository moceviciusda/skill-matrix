import {
  Card,
  CardHeader,
  CardBody,
  HStack,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa';
import { useGetSkillQuery } from '../../slices/skillsApiSlice';
import InfoHoverIcon from '../InfoHoverIcon';
import WeightTag from './WeightTag';
import { useParams } from 'react-router-dom';
import UserSwitch from './UserSwitch';
import {
  useGetAssignmentQuery,
  useUpdateAssignmentMutation,
} from '../../slices/assignmentsAPISlice';
import useAssignmentDetails from '../../hooks/useAssignmentDetails';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Skill = ({ skill }) => {
  const { id: assignmentId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const { data: assignmentData } = useGetAssignmentQuery(assignmentId);

  const [updateAssignment] = useUpdateAssignmentMutation();
  const assignmentSkill = assignmentData.skills.find(
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
    const propertyName =
      assignmentData.assignee === userInfo._id
        ? 'assigneeChecked'
        : 'assignerChecked';

    try {
      await updateAssignment([
        {
          skills: [
            ...assignmentData.skills.filter((s) => s.id !== assignmentSkill.id),
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

  if (skillLoading) return <></>;

  return (
    <Card
      as='label'
      variant='outline'
      width='100%'
      cursor='pointer'
      // bg='green.100'
      htmlFor={userInfo._id + skill.skillId}
    >
      <CardHeader paddingX={2} pt={2} pb={0}>
        <Text>{skillData.summary}</Text>
      </CardHeader>
      <CardBody p={1}>
        <HStack justify='flex-end' gap='2px'>
          <UserSwitch
            id={assignmentData.assignedBy + skill.skillId}
            user={assignedBy}
            isDisabled={userInfo._id !== assignmentData.assignedBy}
            defaultChecked={assignmentSkill?.assignerChecked}
            onChange={(e) => switchChangeHandler(e)}
          />
          <UserSwitch
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
