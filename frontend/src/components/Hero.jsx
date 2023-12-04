import { ButtonGroup, Container } from 'react-bootstrap';
import { useGetSkillsQuery } from '../slices/skillsApiSlice';
import SkillGroup from './matrix/SkillGroup';
import Competence from './matrix/Competence';
import { useGetCompetenceQuery } from '../slices/competenceApiSlice';
import Matrix from './matrix/Matrix';

const Hero = () => {
  const { data, isLoading } = useGetCompetenceQuery('6568863a025e44b30b239cbc');

  // const userData = JSON.stringify(data);
  if (isLoading) return <></>;

  return (
    <Container fluid>
      <Matrix />
    </Container>
  );
};

export default Hero;
