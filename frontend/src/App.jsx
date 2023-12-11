import { Outlet } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Divider, Grid, GridItem } from '@chakra-ui/react';

const App = () => {
  return (
    <Grid templateAreas={"'nav' 'main'"}>
      <GridItem area='nav'>
        <NavBar m={0} p={4} pl={12} pr={6} />
        <Divider />
        <ToastContainer />
      </GridItem>

      <GridItem area='main'>
        <Outlet />
      </GridItem>
    </Grid>
  );
};
export default App;
