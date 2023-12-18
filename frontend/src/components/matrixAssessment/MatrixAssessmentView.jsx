import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Progress,
} from '@chakra-ui/react';
import CompetenceCategory from './CompetenceCategory';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import { useState } from 'react';

const MatrixAssessmentView = ({ matrixId }) => {
  const { data, isLoading } = useGetMatrixQuery(matrixId);

  const [totalProgress, setTotalProgress] = useState(0);

  if (isLoading) return <></>;

  return (
    <>
      <Progress size='lg' minW='80%' borderRadius={10} value={totalProgress} />

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
            <Button
              as={Tab}
              key={category.name}
              variant='ghost'
              p={6}
              whiteSpace='normal'
            >
              {category.name}
            </Button>
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
