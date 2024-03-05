import { useCreateMatrixMutation } from '../../slices/matrixApiSlice';
import { useSelector } from 'react-redux';
import useCloneCompetence from './useCloneCompetence';

const useCloneMatrix = (matrix) => {
  const [cloneCompetence] = useCloneCompetence();
  const [createMatrix, { isLoading, error }] = useCreateMatrixMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const cloneMatrix = async () => {
    const newCategories = matrix.categories.map(async (category) => {
      const clonedCompetences = await Promise.all(
        category.competences.map(async (competence) => {
          const clonedCompetence = await cloneCompetence(
            competence.competenceId
          );
          return {
            ...competence,
            competenceId: clonedCompetence._id,
          };
        })
      );
      return {
        ...category,
        competences: clonedCompetences,
      };
    });

    const resolvedCategories = await Promise.all(newCategories);

    return await createMatrix({
      ...matrix,
      name: `${matrix.name} (clone)`,
      ownerId: userInfo._id,
      categories: resolvedCategories,
    }).unwrap();
  };

  return [cloneMatrix, { isLoading, error }];
};

export default useCloneMatrix;
