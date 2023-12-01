import { ToggleButton } from 'react-bootstrap';
import { useState } from 'react';

const Skill = ({ summary, description, id }) => {
  const [checked, setChecked] = useState(false);

  const changeHandler = (e) => {
    setChecked(e.currentTarget.checked);
    console.log(id, summary, description);
  };

  return (
    <ToggleButton
      className='mb-2'
      id={id}
      type='checkbox'
      variant='outline-success'
      checked={checked}
      // value='1'
      onChange={changeHandler}
    >
      {summary}
    </ToggleButton>
  );
};

export default Skill;
