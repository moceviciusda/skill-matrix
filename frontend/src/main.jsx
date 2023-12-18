import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import theme from './theme.js';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import MatrixBuilderScreen from './screens/MatrixBuilderScreen.jsx';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import AssignmentsScreen from './screens/AssignmentsScreen.jsx';
import MyTeamScreen from './screens/MyTeamScreen.jsx';
import AssignmentScreen from './screens/AssignmentScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Private Routes*/}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/assignments' element={<AssignmentsScreen />} />
        <Route path='/assignments/:id' element={<AssignmentScreen />} />
      </Route>

      {/* Admin Routes*/}
      <Route path='' element={<AdminRoute />}>
        <Route path='/builder/:id?' element={<MatrixBuilderScreen />} />
        <Route path='/team' element={<MyTeamScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);
