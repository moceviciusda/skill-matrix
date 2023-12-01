import { ButtonGroup } from 'react-bootstrap';
import { useGetSkillsQuery } from '../slices/skillsApiSlice';
import SkillGroup from './matrix/SkillGroup';
import Competence from './matrix/Competence';
import { useGetCompetenceQuery } from '../slices/competenceApiSlice';

const Hero = () => {
  const { data, isLoading } = useGetCompetenceQuery('6568863a025e44b30b239cbc');

  // const userData = JSON.stringify(data);
  if (isLoading) return <></>;

  return (
    <>
      <Competence competenceData={data[0]}></Competence>
    </>
  );
};

export default Hero;
