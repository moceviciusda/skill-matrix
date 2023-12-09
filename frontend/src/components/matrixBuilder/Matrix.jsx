import CompetenceCategory from './CompetenceCategory';
import { useParams } from 'react-router-dom';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import Loader from '../Loader';
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react';

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
      <TabList position='sticky' top='12px' alignSelf='flex-start' minW='200px'>
        {data.categories.map((category) => (
          <Button as={Tab} key={category.name} m='4px' variant='ghost'>
            {category.name}
          </Button>
        ))}
        <Button as={Tab} key='addCategory' m='4px' variant='ghost'>
          Add Category
        </Button>
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
