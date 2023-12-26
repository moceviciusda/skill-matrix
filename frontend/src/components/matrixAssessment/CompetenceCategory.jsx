import { VStack, Wrap, WrapItem } from '@chakra-ui/react';
import Competence from './Competence';

const CompetenceCategory = ({ category }) => {
  return (
    <Wrap justify='center'>
      {category.competences.map((competence) => (
        <WrapItem
          key={competence.competenceId}
          flex={1}
          minW={{ base: '300px', md: '400px' }}
        >
          <Competence competence={competence} />
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default CompetenceCategory;
