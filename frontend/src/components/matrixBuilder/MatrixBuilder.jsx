import CompetenceCategory from './CompetenceCategory';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react';

const MatrixBuilder = ({ matrixId }) => {
  const { data, isLoading } = useGetMatrixQuery(matrixId);
  if (isLoading) return <></>;

  return (
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
          <Button as={Tab} key={category.name} variant='ghost'>
            {category.name}
          </Button>
        ))}
        <Button as={Tab} key='addCategory' variant='ghost'>
          Add Category
        </Button>
      </TabList>

      <TabPanels>
        {data.categories.map((category) => (
          <TabPanel key={category.name} p={0} pl={3}>
            <CompetenceCategory
              category={category}
              categories={data.categories}
            />
          </TabPanel>
        ))}
        <TabPanel>Add category component</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MatrixBuilder;