import { Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import CompetenceCategory from './CompetenceCategory';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import MatrixTab from './MatrixTab';
import TotalProgressBar from './TotalProgressBar';

const MatrixAssessmentView = ({ matrixId, assignmentData }) => {
  const { data, isLoading } = useGetMatrixQuery(matrixId);

  if (isLoading) return <></>;

  return (
    <>
      <TotalProgressBar matrixData={data} assignmentData={assignmentData} />
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
