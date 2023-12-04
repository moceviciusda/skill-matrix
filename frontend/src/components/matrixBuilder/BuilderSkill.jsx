import {
  Container,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Popover,
  Form,
} from 'react-bootstrap';
import { FaTrashAlt, FaInfoCircle, FaWeightHanging } from 'react-icons/fa';
import { useState } from 'react';
import { useGetSkillsQuery } from '../../slices/skillsApiSlice';

const BuilderSkill = ({ skill, removeSkillHandler, submitWeightHandler }) => {
  const [showWeightForm, setShowWeightForm] = useState(false);
  // const [weight, setWeight] = useState(skill.weight);

  const { data, isLoading } = useGetSkillsQuery({
    _id: skill.skillId,
  });

  const renderDescription = (props) => (
    <Popover id={`${skill.skillId}-popover`} {...props}>
      <Popover.Header>Description</Popover.Header>
      <Popover.Body>{data[0].description}</Popover.Body>
    </Popover>
  );

  const submitWeight = (e) => {
    submitWeightHandler(e, skill);
    setShowWeightForm(false);
  };

  if (isLoading) return <></>;

  return (
    <ListGroup.Item id={skill.skillId}>
      {/* <Container fluid> */}
      <Row>
        <Col>{data[0].summary}</Col>
        <Col md={2}>
          <Row>
            <OverlayTrigger
              placement='right'
              delay={{ show: 250, hide: 400 }}
              overlay={renderDescription}
            >
              <Container>
                <FaInfoCircle size={20} color='grey' />
              </Container>
            </OverlayTrigger>
          </Row>
          <Row>
            <Container title='weight'>
              {!showWeightForm ? (
                <FaWeightHanging
                  size={20}
                  onClick={() => setShowWeightForm(true)}
                />
              ) : (
                <Form.Control
                  style={{ width: '30px' }}
                  size='sm'
                  type='text'
                  defaultValue={skill.weight}
                  // onChange={(e) => setWeight(e.target.value)}
                  onBlur={(e) => submitWeight(e)}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
              )}
            </Container>
          </Row>
          <Row>
            <Container title='remove'>
              <FaTrashAlt
                size={20}
                color='crimson'
                onClick={() => removeSkillHandler(skill.skillId)}
              />
            </Container>
          </Row>
        </Col>
      </Row>
      {/* </Container> */}
    </ListGroup.Item>
  );
};

export default BuilderSkill;
