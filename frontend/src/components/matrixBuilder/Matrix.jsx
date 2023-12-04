import { Tabs, Tab, Container, Row, Col } from 'react-bootstrap';
import CompetenceCategory from './CompetenceCategory';

const Matrix = () => {
  return (
    <Tabs defaultActiveKey='1' id='uncontrolled-tab-example' className='mb-3'>
      <Tab eventKey='1' title='Procedures'>
        <Container fluid>
          <Row>
            <Col>tests</Col>
          </Row>
        </Container>
        <CompetenceCategory />
      </Tab>
      <Tab eventKey='2' title='Testing'>
        Testing competences
      </Tab>
      <Tab eventKey='3' title='Communication'>
        Communication competences
      </Tab>
      <Tab eventKey='4' title='Projects'>
        Projects competences
      </Tab>
      <Tab eventKey='5' title='Higher Level'>
        Higher Level competences
      </Tab>
      <Tab eventKey='6' title='New'>
        Add new competence category
      </Tab>
    </Tabs>
  );
};

export default Matrix;
