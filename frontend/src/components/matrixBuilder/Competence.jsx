import { Container, Accordion, Row, Col } from 'react-bootstrap';
import SkillGroup from './SkillGroup';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';
import Loader from '../Loader';
import { FaWeightHanging, FaTrashAlt } from 'react-icons/fa';
import Weight from './Weight';

const Competence = ({
  competence,
  removeCompetenceHandler,
  submitWeightHandler,
}) => {
  const { data, isLoading } = useGetCompetenceQuery(competence.competenceId);

  const removeCompetence = () => {
    console.log('remove competence');
  };

  const submitWeight = () => {
    console.log('weight set');
  };

  if (isLoading) return <Loader />;

  return (
    <Accordion.Item eventKey={data._id}>
      <Accordion.Header style={{ display: 'flex' }}>
        <Container>{data.name}</Container>
        <Container style={{ flexGrow: 0 }}>
          <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Col style={{ flexGrow: 0 }} onClick={(e) => e.stopPropagation()}>
              <Weight
                size={20}
                onSubmit={submitWeightHandler}
                obj={competence}
              />
            </Col>
            <Col style={{ flexGrow: 0 }} onClick={(e) => e.stopPropagation()}>
              <FaTrashAlt
                size={20}
                color='crimson'
                onClick={() => removeCompetenceHandler(competence)}
              />
            </Col>
          </Row>
        </Container>
      </Accordion.Header>
      <Accordion.Body
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {Object.keys(data.levels).map(
          (level) =>
            level !== '_id' && (
              <SkillGroup
                competenceId={data._id}
                key={data._id + level}
                skills={data.levels[level]}
                title={level}
                style={{ flex: 1 }}
              />
            )
        )}
      </Accordion.Body>
      <Accordion.Body>
        <Container className='card' fluid>
          ssasa
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Competence;
