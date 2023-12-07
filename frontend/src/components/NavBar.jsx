import { Navbar, Nav, Container } from 'react-bootstrap';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaRegistered,
  FaListUl,
  FaTasks,
} from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { BsGrid1X2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { HStack, Heading } from '@chakra-ui/react';
import ColorModeSwitch from './ColorModeSwitch';

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <HStack justifyContent='space-between' p='10px'>
        <NavLink to='/'>
          <Heading fontSize='lg'>Skill-Matrix</Heading>
        </NavLink>
        <ColorModeSwitch />
      </HStack>

      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <NavLink to='/'>
            <Navbar.Brand>Skill-Matrix</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {userInfo && (
                <>
                  <LinkContainer to='/'>
                    <Nav.Link>
                      <FaTasks /> Assignments
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo?.role === 'admin' && (
                <>
                  <LinkContainer to='/builder'>
                    <Nav.Link>
                      <BsGrid1X2 /> Matrix Builder
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/profile'>
                    <Nav.Link>
                      <CgProfile /> {userInfo.name}
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logoutHandler}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaRegistered /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
