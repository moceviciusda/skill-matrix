import {
  useGetMatrixQuery,
  useUpdateMatrixMutation,
} from '../../slices/matrixApiSlice';
import {
  Card,
  CardHeader,
  CardBody,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Flex,
  Heading,
} from '@chakra-ui/react';
import AddCategoryForm from './AddCategoryForm';
import { toast } from 'react-toastify';
import BuilderCompetenceCategory from './BuilderCompetenceCategory';
import MatrixBuilderTab from './MatrixBuilderTab';

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
    <Flex justify='center'>
      <Card size='lg' flexBasis={{ base: '100%', xl: '80%' }}>
        <CardHeader>
          <Heading>{data.name}</Heading>
        </CardHeader>

        <CardBody p={0}>
          <Tabs
            orientation='vertical'
            variant='soft-rounded'
            colorScheme='purple'
            p='12px'
            flexBasis={{ base: '100%', xl: '80%' }}
          >
            <TabList
              position='sticky'
              top='12px'
              alignSelf='flex-start'
              minW='200px'
              gap={1}
            >
              {data.categories.map((category, i) => (
                <MatrixBuilderTab
                  key={category.name + i}
                  category={category}
                  matrix={data}
                />
              ))}
              <AddCategoryForm addCategoryHandler={addCategoryHandler} />
            </TabList>

            <TabPanels>
              {data.categories.map((category) => (
                <TabPanel key={category.name} p={0} pl={3}>
                  <BuilderCompetenceCategory
                    category={category}
                    categories={data.categories}
                  />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default MatrixBuilder;
