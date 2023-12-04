import { useEffect, useState } from 'react';
import { ListGroup, Col, ListGroupItem } from 'react-bootstrap';
import BuilderSkill from './BuilderSkill';
import AddSkill from './AddSkill';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const SkillGroup = ({ competenceId, skills, title }) => {
  const [skillsState, setSkillsState] = useState(skills);

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  // useEffect(() => {
  //   const res = updateCompetenceLevels(competenceId, {
  //     [title]: skills,
  //   });
  // }, skills);

  // if (isLoading) return <></>;

  const removeSkillHandler = async (skillId) => {
    let body = skillsState.filter((skill) => skill.skillId !== skillId);

    try {
      const res = await updateCompetenceLevels({
        id: competenceId,
        [title]: body,
      }).unwrap();
      toast.success(`Skill removed`);
      setSkillsState(body);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Col>
      <ListGroup>
        <ListGroupItem variant='dark'>{title}</ListGroupItem>
        {skillsState.map((skill) => (
          <BuilderSkill
            stateChanger={setSkillsState}
            skills={skillsState}
            competenceId={competenceId}
            skill={skill}
            key={skill.skillId}
            title={title}
            removeSkillHandler={removeSkillHandler}
          />
        ))}
        <AddSkill
          stateChanger={setSkillsState}
          skills={skillsState}
          competenceId={competenceId}
          title={title}
        />
      </ListGroup>
    </Col>
  );
};

export default SkillGroup;
