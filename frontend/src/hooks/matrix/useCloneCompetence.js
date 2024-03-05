import {
  useLazyGetCompetenceQuery,
  useCreateCompetenceMutation,
} from '../../slices/competenceApiSlice';

const useCloneCompetence = () => {
  const [createCompetence, { isLoading: createLoading, error: createError }] =
    useCreateCompetenceMutation();
  const [getCompetence, { isLoading: compLoading, error: getError }] =
    useLazyGetCompetenceQuery();

  const cloneCompetence = async (competenceId) => {
    const { data } = await getCompetence(competenceId);
    const newCompetence = await createCompetence(data).unwrap();
    return newCompetence;
  };

  return [
    cloneCompetence,
    { isLoading: createLoading || compLoading, error: createError || getError },
  ];
};

export default useCloneCompetence;
