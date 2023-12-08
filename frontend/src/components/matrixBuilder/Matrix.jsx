import CompetenceCategory from './CompetenceCategory';
import { useParams } from 'react-router-dom';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import Loader from '../Loader';
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

const Matrix = () => {
  const { id } = useParams();
  if (!id) return <>Create NEW MATRIX</>;

  const { data, isLoading } = useGetMatrixQuery(id);
  if (isLoading) return <Loader />;

  return (
    <Tabs
      orientation='vertical'
      variant='soft-rounded'
      colorScheme='purple'
      p='12px'
    >
      <TabList minW='200px' position='sticky'>
        {data.categories.map((category) => (
          <Tab key={category.name} m='4px'>
            {category.name}
          </Tab>
        ))}
        <Tab>Add Category</Tab>
      </TabList>

      <TabPanels>
        {data.categories.map((category) => (
          <TabPanel key={category.name}>
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

export default Matrix;
