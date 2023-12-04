import { ToggleButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useGetSkillsQuery } from '../../slices/skillsApiSlice';

const Skill = ({ id }) => {
  const [checked, setChecked] = useState(false);
  const { data, isLoading } = useGetSkillsQuery({
    _id: id,
  });

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
      {data[0].summary}
    </ToggleButton>
  );
};

export default Skill;
