import Competence from './Competence';
import { useState } from 'react';
import {
  useGetMatrixQuery,
  useUpdateMatrixMutation,
} from '../../slices/matrixApiSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddCompetence from './AddCompetence';
import { VStack } from '@chakra-ui/react';

const CompetenceCategory = ({ category }) => {
  const [competenceList, setCompetenceList] = useState(category.competences);

  const { id } = useParams();
  const { data } = useGetMatrixQuery(id);
  const [updateMatrix] = useUpdateMatrixMutation();

  const removeCompetenceHandler = async (competence) => {
    const updatedCategory = {
      ...category,
      competences: competenceList.filter(
        (comp) => comp.competenceId !== competence.competenceId
      ),
    };
    const body = {
      categories: [...data.categories],
    };
    body.categories.splice(
      body.categories.indexOf(category),
      1,
      updatedCategory
    );

    console.log(body);
    try {
      await updateMatrix([body, id]).unwrap();
      toast.success(`Competence removed`);
      setCompetenceList(updatedCategory.competences);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitWeightHandler = async (e, competence) => {
    e.preventDefault();
    if (parseFloat(e.target.value) != competence.weight) {
      const updatedCompetenceList = competenceList.filter(
        (comp) => comp != competence
      );
      updatedCompetenceList.splice(competenceList.indexOf(competence), 0, {
        ...competence,
        weight: e.target.value,
      });

      const updatedCategory = {
        ...category,
        competences: updatedCompetenceList,
      };
      const body = {
        categories: [...data.categories],
      };
      body.categories.splice(
        body.categories.indexOf(category),
        1,
        updatedCategory
      );

      try {
        await updateMatrix([body, id]).unwrap();
        toast.success(`Competence weight set to: ${e.target.value}`);
        setCompetenceList(updatedCompetenceList);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <VStack>
      {competenceList.map((competence) => (
        <Competence
          key={competence.competenceId}
          competence={competence}
          removeCompetenceHandler={removeCompetenceHandler}
          submitWeightHandler={submitWeightHandler}
        ></Competence>
      ))}

      <AddCompetence />
    </VStack>
  );
};

export default CompetenceCategory;
