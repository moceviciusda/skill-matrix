import { useEffect, useState } from 'react';
import { ListGroup, Col, ListGroupItem } from 'react-bootstrap';
import Skill from './Skill';
import AddSkill from './AddSkill';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const SkillGroup = ({ competenceId, skillIds, title }) => {
  const [skills, setSkills] = useState(skillIds);

  // const [updateCompetenceLevels, { isLoading }] =
  //   useUpdateCompetenceLevelsMutation();

  // useEffect(() => {
  //   const res = updateCompetenceLevels(competenceId, {
  //     [title]: skills,
  //   });
  // }, skills);

  // if (isLoading) return <></>;

  return (
    <Col>
      <ListGroup>
        <ListGroupItem>{title}</ListGroupItem>
        {skills.map((id) => (
          <Skill key={id} id={id} />
        ))}
        <AddSkill
          stateChanger={setSkills}
          skills={skills}
          competenceId={competenceId}
          title={title}
        />
      </ListGroup>
    </Col>
  );
};

export default SkillGroup;
