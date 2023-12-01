import { Container, Row, Col, Accordion } from 'react-bootstrap';
import SkillGroup from './SkillGroup';
import { useGetSkillsQuery } from '../../slices/skillsApiSlice';

const Competence = ({ competenceData }) => {
  const { data = [], isLoading } = useGetSkillsQuery({});

  console.log(competenceData);

  if (isLoading) return <></>;

  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Placeholder Competence</Accordion.Header>
        <Accordion.Body>
          <Row>
            {competenceData?.levels?.map((level) => {
              <Col>
                <SkillGroup skillIds={level.skillIds} title={level.title} />
              </Col>;
            })}
            <Col>
              <SkillGroup data={data} title={'title'} />
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Competence;
