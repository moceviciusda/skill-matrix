import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import Skill from './Skill';
import AddSkill from './AddSkill';
import { useGetSkillsQuery } from '../../slices/skillsApiSlice';


const SkillGroup = ({ skillIds = [] }) => {
  const skillList = await skillIds.reduce(id => {
    useGetSkillsQuery()
  }, [])
  const useGetSkillsQuery()

  const [skills, setSkills] = useState(data);

  return (
    <ListGroup>
      {skills.map((skill, i) => (

        skill = 
        <Skill
          id={skill._id}
          summary={skill.summary}
          description={skill.description}
        />
      ))}
      <AddSkill stateChanger={setSkills} skills={skills} />
    </ListGroup>
  );
};

export default SkillGroup;
