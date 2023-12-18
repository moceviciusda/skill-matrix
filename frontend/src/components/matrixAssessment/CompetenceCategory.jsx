import { VStack } from '@chakra-ui/react';
import Competence from './Competence';

const CompetenceCategory = ({ category }) => {
  return (
    <VStack>
      {category.competences.map((competence) => (
        <Competence key={competence.competenceId} competence={competence} />
      ))}
    </VStack>
  );
};

export default CompetenceCategory;
