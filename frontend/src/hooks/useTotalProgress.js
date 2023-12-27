import useCategoryProgress from './useCategoryProgress';

const useTotalProgress = (matrix, assignmentData) => {
  const totalWeight = matrix.categories.reduce(
    (acc, category) => acc + category.weight,
    0
  );

  let singleTotalProgress = 0;
  let fullTotalProgress = 0;
  let isLoading = false;
  matrix.categories.forEach((category) => {
    const {
      singleCheckProgress,
      fullCheckProgress,
      isLoading: catLoading,
    } = useCategoryProgress(category, assignmentData);

    singleTotalProgress += singleCheckProgress * category.weight;
    fullTotalProgress += fullCheckProgress * category.weight;
    isLoading = catLoading;
  });

  return {
    singleCheckProgress: singleTotalProgress / totalWeight || 0,
    fullCheckProgress: fullTotalProgress / totalWeight || 0,
    isLoading,
  };
};

export default useTotalProgress;
