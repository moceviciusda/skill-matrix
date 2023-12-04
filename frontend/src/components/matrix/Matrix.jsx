import { Accordion, Row, Col } from 'react-bootstrap';
import Competence from './Competence';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';

const Matrix = () => {
  const { data, isLoading } = useGetCompetenceQuery();

  if (isLoading) return <></>;

  return (
    <Accordion alwaysOpen>
      {data.map((competence) => (
        <Competence
          key={competence._id}
          competenceData={competence}
        ></Competence>
      ))}
    </Accordion>
  );
};

export default Matrix;
