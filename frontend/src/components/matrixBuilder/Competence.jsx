import { Container, Row, Accordion, Col } from 'react-bootstrap';
import SkillGroup from './SkillGroup';

const Competence = ({ competenceData }) => {
  // const [levels, setLevels] = useState(competenceData.levels);

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
        <Container className='card' fluid>
          ssasa
        </Container>
      </Accordion.Body>
      <Accordion.Body>
        <Row>
          <Col>
            <SkillGroup
              competenceId={competenceData._id}
              key={competenceData._id + 'beginner'}
              skills={competenceData.levels.beginner}
              title='beginner'
            />
          </Col>
          <Col>
            <SkillGroup
              competenceId={competenceData._id}
              key={competenceData._id + 'advanced'}
              skills={competenceData.levels.advanced}
              title='advanced'
            />
          </Col>
          <Col>
            <SkillGroup
              competenceId={competenceData._id}
              key={competenceData._id + 'proficient'}
              skills={competenceData.levels.proficient}
              title='proficient'
            />
          </Col>
          <Col>
            <SkillGroup
              competenceId={competenceData._id}
              key={competenceData._id + 'expert'}
              skills={competenceData.levels.expert}
              title='expert'
            />
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Competence;
