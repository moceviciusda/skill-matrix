import CompetenceCategory from './CompetenceCategory';
import {
  useGetMatrixQuery,
  useUpdateMatrixMutation,
} from '../../slices/matrixApiSlice';
import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Button,
} from '@chakra-ui/react';
import AddCategoryForm from './AddCategoryForm';
import { toast } from 'react-toastify';

const MatrixBuilder = ({ matrixId }) => {
  const { data, isLoading } = useGetMatrixQuery(matrixId);

  const [updateMatrix] = useUpdateMatrixMutation();

  const addCategoryHandler = async (name) => {
    try {
      await updateMatrix([
        { categories: [...data.categories, { name }] },
        matrixId,
      ]);
      toast.success(`Category Created: ${name}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
        <AddCategoryForm addCategoryHandler={addCategoryHandler} />
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
      </TabPanels>
    </Tabs>
  );
};

export default MatrixBuilder;
