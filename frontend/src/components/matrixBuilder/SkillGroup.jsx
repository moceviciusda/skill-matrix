import { useState } from 'react';
import { ListGroup, Col, ListGroupItem, Row } from 'react-bootstrap';
import { FaWeightHanging } from 'react-icons/fa';
import BuilderSkill from './BuilderSkill';
import AddSkill from './AddSkill';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const SkillGroup = ({ competenceId, skills, title, style }) => {
  const [skillsState, setSkillsState] = useState(skills);

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

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
    <ListGroup style={style}>
      <ListGroupItem variant='dark'>
        <Row>
          <Col>{title}</Col>
          <Col>
            <FaWeightHanging /> Total:{' '}
            {skillsState.reduce((acc, skill) => acc + skill.weight, 0)}
          </Col>
        </Row>
      </ListGroupItem>
      {skillsState.map((skill) => (
        <BuilderSkill
          key={skill.skillId}
          skill={skill}
          removeSkillHandler={removeSkillHandler}
          submitWeightHandler={submitWeightHandler}
        />
      ))}
      <AddSkill
        stateChanger={setSkillsState}
        skills={skillsState}
        competenceId={competenceId}
        title={title}
      />
    </ListGroup>
  );
};

export default SkillGroup;
