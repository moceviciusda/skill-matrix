import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Progress,
  Text,
  Flex,
  HStack,
  VStack,
} from '@chakra-ui/react';
import CompetenceCategory from './CompetenceCategory';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import { useState } from 'react';
import { useGetCompetenceQuery } from '../../slices/competenceApiSlice';
import useCategoryProgress from '../../hooks/useCategoryProgress';
import MatrixTab from './MatrixTab';

const MatrixAssessmentView = ({ matrixId, assignmentData }) => {
  const { data, isLoading } = useGetMatrixQuery(matrixId);

  const getCompetenceProgress = (competenceId) => {
    const { data: competenceData } = useGetCompetenceQuery(competenceId);

    const totalWeight = competenceData?.skills.reduce(
      (acc, skill) => acc + skill.weight,
      0
    );

    const singleCheckWeight = competenceData?.skills.reduce((acc, skill) => {
      const assSkill = assignmentData.skills.find(
        (s) => s.id === skill.skillId
      );
      if (assSkill?.assigneeChecked || assSkill?.assignerChecked)
        acc += skill.weight;
      return acc;
    }, 0);

    const fullCheckWeight = competenceData?.skills.reduce((acc, skill) => {
      const assSkill = assignmentData.skills.find(
        (s) => s.id === skill.skillId
      );
      if (assSkill?.assigneeChecked && assSkill?.assignerChecked)
        acc += skill.weight;
      return acc;
    }, 0);

    return {
      singleCheckProgress: singleCheckWeight / totalWeight,
      fullCheckProgress: fullCheckWeight / totalWeight,
    };
  };

  const setCategoryProgress = (category) => {
    // if (category) {
    const totalWeight = category?.competences.reduce(
      (acc, competence) => acc + competence.weight,
      0
    );

    const singleCheckWeight = category?.competences.reduce(
      (acc, competence) => {
        const { singleCheckProgress, fullCheckProgress } =
          getCompetenceProgress(competence.competenceId);
        const single =
          competence.weight * getCompetenceProgress(competence.competenceId);
        acc += skill.weight;
        return acc;
      },
      0
    );

    console.log(totalWeight);
    // }
  };

  // if (!isLoading) console.log(useCategoryProgress(data?.categories[0]));

  // console.log(getCompetenceProgress('658aef7a31e3ec97d3cccf38'));
  // getCategoryProgress(data?.categories[0]);

  if (isLoading) return <></>;

  return (
    <>
      {/* <Progress size='lg' borderRadius='full' value={50} hasStripe isAnimated /> */}

      <Progress
        borderRadius='full'
        variant='multiSegment'
        m={4}
        height={8}
        min={0}
        max={100}
        values={{
          green: 65,
          yellow: 15,
        }}
      />
      <Tabs
        orientation='vertical'
        variant='soft-rounded'
        colorScheme='purple'
        p='12px'
      >
        <TabList
          position='sticky'
          top='12px'
          alignSelf='flex-start'
          minW='200px'
          gap={1}
        >
          {data.categories.map((category) => (
            <MatrixTab
              key={category.name}
              category={category}
              assignmentData={assignmentData}
            />
          ))}
        </TabList>

        <TabPanels>
          {data.categories.map((category) => (
            <TabPanel key={category.name} p={0} pl={3}>
              <CompetenceCategory category={category} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MatrixAssessmentView;
