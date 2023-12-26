import useCompetenceProgress from './useCompetenceProgress';

const useCategoryProgress = (category, assignmentData) => {
  const totalWeight = category.competences.reduce(
    (acc, competence) => acc + competence.weight,
    0
  );

  let singleCatProgress = 0;
  let fullCatProgress = 0;
  let isLoading = false;
  category.competences.forEach((competence) => {
    const {
      singleCheckProgress,
      fullCheckProgress,
      isLoading: compLoading,
    } = useCompetenceProgress(competence.competenceId, assignmentData);

    singleCatProgress += singleCheckProgress * competence.weight;
    fullCatProgress += fullCheckProgress * competence.weight;
    isLoading = compLoading;
  });

  return {
    singleCheckProgress: singleCatProgress / totalWeight || 0,
    fullCheckProgress: fullCatProgress / totalWeight || 0,
    isLoading,
  };
};

export default useCategoryProgress;
