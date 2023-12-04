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
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';

const BuilderSkill = ({
  stateChanger,
  skills,
  competenceId,
  skill,
  title,
  removeSkillHandler,
}) => {
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [weight, setWeight] = useState(skill.weight);

  const { data, isLoading } = useGetSkillsQuery({
    _id: skill.skillId,
  });

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  const renderDescription = (props) => (
    <Popover id={`${skill.skillId}-popover`} {...props}>
      <Popover.Header>Description</Popover.Header>
      <Popover.Body>{data[0].description}</Popover.Body>
    </Popover>
  );

  const submitWeightHandler = async (e) => {
    e.preventDefault();
    if (parseFloat(e.target.value) != skill.weight) {
      let body = skills.filter((s) => s.skillId !== skill.skillId);
      body.splice(
        skills.findIndex((s) => s.skillId === skill.skillId),
        0,
        { weight: weight, skillId: skill.skillId }
      );

      try {
        const res = await updateCompetenceLevels({
          id: competenceId,
          [title]: body,
        }).unwrap();
        toast.success(`${data[0].summary} weight set to: ${weight}`);
        stateChanger([...res.levels[title]]);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        setWeight(skill.weight);
      }
    }
    setShowWeightForm(false);
  };

  if (isLoading) return <></>;

  return (
    <ListGroup.Item id={skill.skillId}>
      <Container>
        <Row>
          <Col>{data[0].summary}</Col>
          <Col md={2} className='justify-content-right'>
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
                    type='text'
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    onBlur={submitWeightHandler}
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
      </Container>
    </ListGroup.Item>
  );
};

export default BuilderSkill;
