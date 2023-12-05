import { Accordion, Container, Form, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';

const AddCompetence = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setShowForm(false);
    console.log('new comp');
  };

  return (
    <>
      {!showForm ? (
        <Accordion.Item
          className='mb-2'
          variant='primary'
          onClick={() => setShowForm(true)}
        >
          <Container
            style={{
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}
          >
            <FaPlusSquare color='green' /> Add Competence
          </Container>
        </Accordion.Item>
      ) : (
        <Accordion.Item>
          <Container>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Control
                className='mb-2'
                type='text'
                placeholder='Name'
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              {/* <Form.Control
              as='textarea'
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
            /> */}

              {/* <Accordion.Item action className='mb-2' variant='primary'> */}
              <Container
                //   itemType='button'
                onClick={(e) => submitHandler(e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <FaPlusSquare color='green' /> Submit
              </Container>
            </Form>
          </Container>
        </Accordion.Item>
      )}
    </>
  );
};

export default AddCompetence;
