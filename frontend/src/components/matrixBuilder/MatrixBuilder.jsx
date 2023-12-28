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
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Flex,
  Heading,
} from '@chakra-ui/react';
import AddCategoryForm from './AddCategoryForm';
import { toast } from 'react-toastify';
import BuilderCompetenceCategory from './BuilderCompetenceCategory';

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
              {data.categories.map((category) => (
                <Tab
                  key={category.name}
                  borderRadius={8}
                  _selected={{
                    bg: 'purple.100',
                    boxShadow:
                      '0px 4px 2px 1px var(--chakra-colors-purple-400)',
                  }}
                  _hover={{
                    bg: 'purple.100',
                    boxShadow:
                      '0px 4px 2px 1px var(--chakra-colors-purple-400)',
                  }}
                  _active={{
                    boxShadow:
                      '0px 0px 4px -12px var(--chakra-colors-purple-400)',
                  }}
                >
                  {category.name}
                </Tab>
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
