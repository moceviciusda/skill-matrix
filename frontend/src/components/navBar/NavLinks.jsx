import { Box, Spacer, Stack } from '@chakra-ui/react';
import NavItem from './NavItem';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import ColorModeSwitch from './ColorModeSwitch';
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaRegistered,
  FaListUl,
  FaTasks,
} from 'react-icons/fa';
import { BsGrid1X2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';

const NavLinks = ({ isOpen }) => {
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
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {userInfo && (
          <NavItem to='/'>
            <FaTasks /> Assignments
          </NavItem>
        )}
        {userInfo?.role === 'admin' && (
          <NavItem to='/builder'>
            <BsGrid1X2 /> Matrix Builder
          </NavItem>
        )}
        <Spacer width={200} />
        <ColorModeSwitch />

        {userInfo ? (
          <>
            <NavItem to='/profile'>
              <CgProfile /> {userInfo.name}
            </NavItem>
            <NavItem onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </NavItem>
          </>
        ) : (
          <>
            <NavItem to='/login' icon={FaSignInAlt}>
              Sign In
            </NavItem>
            <NavItem to='/register' icon={FaRegistered}>
              Sign Up
            </NavItem>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default NavLinks;
