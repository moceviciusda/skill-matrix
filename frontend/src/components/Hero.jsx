import { ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import { useGetSkillsQuery } from '../slices/skillsApiSlice';
import SkillGroup from './matrixBuilder/SkillGroup';
import Competence from './matrixBuilder/Competence';
import { useGetCompetenceQuery } from '../slices/competenceApiSlice';
import Matrix from './matrixBuilder/Matrix';
import CompetenceCategory from './matrixBuilder/CompetenceCategory';

const Hero = () => {
  return (
    <Container fluid>
      <Matrix />
    </Container>
  );
};

export default Hero;
