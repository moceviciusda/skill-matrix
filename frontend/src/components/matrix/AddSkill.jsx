import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateSkillMutation } from '../../slices/skillsApiSlice';
import { toast } from 'react-toastify';

const AddSkill = ({ stateChanger, skills }) => {
  const [showForm, setShowForm] = useState(false);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const [createSkill, { isLoading }] = useCreateSkillMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createSkill({ summary, description }).unwrap();
      toast.success('Skill created and added to group');
      stateChanger([...skills, res]);
      setShowForm(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {!showForm && (
        <Button
          className='mb-2'
          variant='outline-primary'
          onClick={() => setShowForm(true)}
        >
          Add New Skill
        </Button>
      )}

      {showForm && (
        <Form onSubmit={submitHandler}>
          <Form.Control
            type='text'
            placeholder='Summary'
            onChange={(e) => setSummary(e.target.value)}
          />
          <Form.Control
            as='textarea'
            placeholder='Description'
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button className='mb-2' variant='outline-primary' type='submit'>
            Add Skill
          </Button>
        </Form>
      )}
    </>
  );
};

export default AddSkill;
