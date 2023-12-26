import BuilderCompetence from './BuilderCompetence';
import { useState } from 'react';
import {
  useGetMatrixQuery,
  useUpdateMatrixMutation,
} from '../../slices/matrixApiSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Wrap, WrapItem } from '@chakra-ui/react';
import AddCompetenceForm from './AddCompetenceForm';
import { useDeleteCompetenceMutation } from '../../slices/competenceApiSlice';

const BuilderCompetenceCategory = ({ category }) => {
  const [competenceList, setCompetenceList] = useState(category.competences);

  const { id } = useParams();
  const { data } = useGetMatrixQuery(id);
  const [updateMatrix] = useUpdateMatrixMutation();
  const [deleteCompetence] = useDeleteCompetenceMutation();

  const generateBody = (updatedCategory) => {
    const body = {
      categories: [...data.categories],
    };
    body.categories.splice(
      body.categories.indexOf(category),
      1,
      updatedCategory
    );
    return body;
  };

  const removeCompetenceHandler = async (competence) => {
    const updatedCategory = {
      ...category,
      competences: competenceList.filter(
        (comp) => comp.competenceId !== competence.competenceId
      ),
    };
    const body = generateBody(updatedCategory);

    try {
      await updateMatrix([body, id]).unwrap();

      setCompetenceList(updatedCategory.competences);
      toast.success(`Competence removed`);
      deleteCompetence(competence.competenceId);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addCompetenceHandler = async (compid) => {
    const updatedCategory = {
      ...category,
      competences: [...competenceList, { competenceId: compid, weight: 1 }],
    };
    const body = generateBody(updatedCategory);

    try {
      await updateMatrix([body, id]).unwrap();
      setCompetenceList(updatedCategory.competences);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitWeightHandler = async (e, competence) => {
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
      const body = generateBody(updatedCategory);

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
    <Wrap>
      {competenceList.map((competence) => (
        <WrapItem
          key={competence.competenceId}
          flex={1}
          minW={{ base: '300px', md: '400px' }}
        >
          <BuilderCompetence
            competence={competence}
            removeCompetenceHandler={removeCompetenceHandler}
            submitWeightHandler={submitWeightHandler}
          />
        </WrapItem>
      ))}

      <AddCompetenceForm addCompetenceHandler={addCompetenceHandler} />
    </Wrap>
  );
};

export default BuilderCompetenceCategory;
