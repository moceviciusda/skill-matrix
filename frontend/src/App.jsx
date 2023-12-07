import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, GridItem } from '@chakra-ui/react';

const App = () => {
  return (
    <Grid templateAreas={"'nav' 'main'"}>
      <GridItem area='nav' bg='coral'>
        <NavBar />
        <ToastContainer />
      </GridItem>

      <GridItem area='main' bg='dodgerblue'>
        <Container className='my-2' fluid>
          <Outlet />
        </Container>
      </GridItem>
    </Grid>
  );
};
export default App;
