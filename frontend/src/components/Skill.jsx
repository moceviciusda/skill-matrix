import { ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useGetSkillQuery } from '../slices/skillsApiSlice';

const Skill = ({ id }) => {
  const [checked, setChecked] = useState(false);
  const { data, isLoading } = useGetSkillQuery(id);

  const changeHandler = (e) => {
    setChecked(e.currentTarget.checked);
  };

  if (isLoading) return <></>;

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
      {data.summary}
    </ToggleButton>
  );
};

export default Skill;
