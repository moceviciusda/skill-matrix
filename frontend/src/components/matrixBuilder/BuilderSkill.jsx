import {
  Container,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import { useGetSkillQuery } from '../../slices/skillsApiSlice';
import Weight from './Weight';

const BuilderSkill = ({ skill, removeSkillHandler, submitWeightHandler }) => {
  const { data, isLoading } = useGetSkillQuery(skill.skillId);

  const renderDescriptionPopover = (props) => (
    <Popover id={`${skill.skillId}-description`} {...props}>
      <Popover.Header>Skill Description</Popover.Header>
      <Popover.Body>{data.description}</Popover.Body>
    </Popover>
  );

  const renderWeightPopover = (props) => (
    <Popover id={`${skill.skillId}-weight`} {...props}>
      <Popover.Header>Skill Weight: {skill.weight}</Popover.Header>
      <Popover.Body>
        Used to determine importance of skill within level.
        <br /> Completion ratio of competence level is calculated by dividing
        weight sum of acquired skills by weight sum of skills within level
      </Popover.Body>
    </Popover>
  );

  if (isLoading) return <></>;

  return (
    <ListGroup.Item id={skill.skillId} style={{ padding: 10 }}>
      <Row
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Col style={{ flex: 1, paddingRight: 0 }}>{data.summary}</Col>
        <Col style={{ flexGrow: 0, flexBasis: '30px', padding: 0 }}>
          <Container
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'space-between',
              minHeight: 90,
            }}
          >
            <Row>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={renderDescriptionPopover}
              >
                <Col>
                  <FaInfoCircle color='grey' />
                </Col>
              </OverlayTrigger>
            </Row>
            <Row>
              <OverlayTrigger
                placement='right'
                delay={{ show: 250, hide: 400 }}
                overlay={renderWeightPopover}
              >
                <Col>
                  <Weight onSubmit={submitWeightHandler} obj={skill} />
                </Col>
              </OverlayTrigger>
            </Row>
            <Row>
              <Col title='remove'>
                <FaTrashAlt
                  color='crimson'
                  onClick={() => removeSkillHandler(skill.skillId)}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default BuilderSkill;
