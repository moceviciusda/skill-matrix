import { Container, Row, Col, Accordion } from 'react-bootstrap';
import SkillGroup from './SkillGroup';
import { useGetSkillsQuery } from '../../slices/skillsApiSlice';
import { useState } from 'react';

const Competence = ({ competenceData }) => {
  const [levels, setLevels] = useState(competenceData.levels);

  // const { data = [], isLoading } = useGetSkillsQuery({
  //   _id: '65697727338bab6405f1c028',
  // });

  // console.log(data);
  // console.log(competenceData);
  // competenceData.levels.map((level) => {
  //   console.log(level);
  // });

  // if (isLoading) return <></>;

  return (
    <Accordion.Item eventKey={competenceData._id}>
      <Accordion.Header>{competenceData.name}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <SkillGroup
            competenceId={competenceData._id}
            key={competenceData._id + 'beginner'}
            skillIds={levels.beginner}
            title='beginner'
          />
          <SkillGroup
            competenceId={competenceData._id}
            key={competenceData._id + 'advanced'}
            skillIds={levels.advanced}
            title='advanced'
          />
          <SkillGroup
            competenceId={competenceData._id}
            key={competenceData._id + 'proficient'}
            skillIds={levels.proficient}
            title='proficient'
          />
          <SkillGroup
            competenceId={competenceData._id}
            key={competenceData._id + 'expert'}
            skillIds={levels.expert}
            title='expert'
          />
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Competence;
