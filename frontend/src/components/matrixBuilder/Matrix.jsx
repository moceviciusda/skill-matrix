import { Tab, Row, Col, Nav } from 'react-bootstrap';
import CompetenceCategory from './CompetenceCategory';
import { useParams } from 'react-router-dom';
import { useGetMatrixQuery } from '../../slices/matrixApiSlice';
import Loader from '../Loader';

const Matrix = () => {
  const { id } = useParams();
  if (!id) return <>Create NEW MATRIX</>;

  const { data, isLoading } = useGetMatrixQuery(id);
  if (isLoading) return <Loader />;

  return (
    <Tab.Container
      id='left-tabs-example'
      defaultActiveKey={data.categories[0].name}
    >
      <Row>
        <Col sm={2} style={{ paddingRight: 0 }}>
          <Nav
            variant='pills'
            className='flex-column'
            style={{ top: 12, position: 'sticky' }}
          >
            {data.categories.map((category) => (
              <Nav.Item key={category.name}>
                <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item>
              <Nav.Link eventKey='Add Category'>Add Category</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            {data.categories.map((category) => (
              <Tab.Pane key={category.name} eventKey={category.name}>
                <CompetenceCategory
                  category={category}
                  categories={data.categories}
                />
              </Tab.Pane>
            ))}
            <Tab.Pane eventKey='Add Category'>Add category component</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default Matrix;
