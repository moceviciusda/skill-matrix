import { useState, useEffect } from 'react';
import { Container, Form, ListGroup } from 'react-bootstrap';
import { useCreateSkillMutation } from '../../slices/skillsApiSlice';
import { useUpdateCompetenceLevelsMutation } from '../../slices/competenceApiSlice';
import { toast } from 'react-toastify';
import { FaPlusSquare } from 'react-icons/fa';

const AddSkill = ({ stateChanger, skills, competenceId, title }) => {
  const [showForm, setShowForm] = useState(false);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const [createSkill, { isLoading }] = useCreateSkillMutation();

  const [updateCompetenceLevels] = useUpdateCompetenceLevelsMutation();

  // useEffect(() => {
  //   document.body.addEventListener('click', (e) => {
  //     console.log(e);
  //     if (e.target.id !== competenceId + title) setShowForm(false);
  //   });

  //   return () =>
  //     document.body.removeEventListener('click', (e) => {
  //       console.log(e);
  //       if (e.target.id !== competenceId + title) setShowForm(false);
  //     });
  // }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createSkill({ summary, description }).unwrap();
      toast.success(`Skill created and added to ${title}`);
      setShowForm(false);
      stateChanger([...skills, { weight: 1, skillId: res._id }]);

      await updateCompetenceLevels([
        { [title]: [...skills, { weight: 1, skillId: res._id }] },
        competenceId,
      ]).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {!showForm ? (
        <ListGroup.Item
          action
          className='mb-2'
          variant='primary'
          onClick={() => setShowForm(true)}
        >
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <FaPlusSquare color='green' /> New Skill
          </Container>
        </ListGroup.Item>
      ) : (
        <Form onSubmit={submitHandler}>
          <ListGroup.Item>
            <Form.Control
              className='mb-2'
              type='text'
              placeholder='Summary'
              autoFocus
              onChange={(e) => setSummary(e.target.value)}
            />
            <Form.Control
              as='textarea'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </ListGroup.Item>
          <ListGroup.Item action className='mb-2' variant='primary'>
            <Container
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
              }}
            >
              <FaPlusSquare color='green' /> Submit
            </Container>
          </ListGroup.Item>
        </Form>
      )}
    </>
  );
};

export default AddSkill;
