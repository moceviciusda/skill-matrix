import { useState } from 'react';
import { ListGroup, Col, ListGroupItem } from 'react-bootstrap';
import BuilderSkill from './BuilderSkill';
import AddSkill from './AddSkill';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const SkillGroup = ({ competenceId, skills, title }) => {
  const [skillsState, setSkillsState] = useState(skills);

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  const removeSkillHandler = async (skillId) => {
    let body = skillsState.filter((skill) => skill.skillId !== skillId);

    try {
      await updateCompetenceLevels({
        id: competenceId,
        [title]: body,
      }).unwrap();
      toast.success(`Skill removed`);
      setSkillsState(body);
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
        const res = await updateCompetenceLevels({
          id: competenceId,
          [title]: body,
        }).unwrap();
        toast.success(` weight set to: ${e.target.value}`);
        setSkillsState([...res.levels[title]]);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        // setWeight(skill.weight);
      }
    }
  };

  return (
    <ListGroup>
      <ListGroupItem variant='dark'>{title}</ListGroupItem>
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
