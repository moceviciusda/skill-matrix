import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaWeightHanging } from 'react-icons/fa';

const Weight = ({ defaultValue, onSubmit, obj, size = 20 }) => {
  const [showWeightForm, setShowWeightForm] = useState(false);

  const submitWeight = (e) => {
    onSubmit(e, obj);
    setShowWeightForm(false);
  };

  return (
    <>
      {!showWeightForm ? (
        <FaWeightHanging size={size} onClick={() => setShowWeightForm(true)} />
      ) : (
        <Form.Control
          style={{ width: '30px' }}
          size='sm'
          type='text'
          defaultValue={obj.weight}
          // onChange={(e) => setWeight(e.target.value)}
          onBlur={(e) => submitWeight(e)}
          autoFocus
          onFocus={(e) => e.target.select()}
        />
      )}
    </>
  );
};

export default Weight;
