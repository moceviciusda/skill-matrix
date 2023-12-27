import { useGetCompetenceQuery } from '../slices/competenceApiSlice';

const useCompetenceProgress = (competenceId, assignmentData) => {
  const { data, isLoading } = useGetCompetenceQuery(competenceId);

  const totalWeight = data?.skills.reduce(
    (acc, skill) => acc + skill.weight,
    0
  );

  const singleCheckWeight = data?.skills.reduce((acc, skill) => {
    const assSkill = assignmentData.skills.find((s) => s.id === skill.skillId);
    if (assSkill?.assigneeChecked || assSkill?.assignerChecked)
      acc += skill.weight;
    return acc;
  }, 0);

  const fullCheckWeight = data?.skills.reduce((acc, skill) => {
    const assSkill = assignmentData.skills.find((s) => s.id === skill.skillId);
    if (assSkill?.assigneeChecked && assSkill?.assignerChecked)
      acc += skill.weight;
    return acc;
  }, 0);

  return {
    singleCheckProgress: singleCheckWeight / totalWeight || 0,
    fullCheckProgress: fullCheckWeight / totalWeight || 0,
    isLoading,
  };
};

export default useCompetenceProgress;
