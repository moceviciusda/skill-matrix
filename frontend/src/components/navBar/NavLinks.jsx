import { Avatar, Box, Center, Divider, Stack } from '@chakra-ui/react';
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
  FaTasks,
} from 'react-icons/fa';
import { BsGrid1X2 } from 'react-icons/bs';
import { RiTeamLine } from 'react-icons/ri';

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
        spacing={1}
        align='center'
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'column', 'row', 'row']}
        flexWrap={'wrap'}
        pt={[4, 4, 0, 0]}
      >
        {userInfo && (
          <NavItem to='/assignments'>
            <FaTasks /> Assignments
          </NavItem>
        )}
        {['admin', 'manager'].includes(userInfo?.role) && (
          <>
            <NavItem to='/builder'>
              <BsGrid1X2 /> Matrix Builder
            </NavItem>
            <NavItem to='/team'>
              <RiTeamLine /> My Team
            </NavItem>

            <Center height='35px' paddingX={4}>
              <Divider orientation='vertical' />
            </Center>
          </>
        )}

        <ColorModeSwitch />

        {userInfo ? (
          <>
            <NavItem to='/profile'>
              <Avatar size='sm' name={userInfo.name} /> {userInfo.name}
            </NavItem>
            <NavItem onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </NavItem>
          </>
        ) : (
          <>
            <NavItem to='/login'>
              <FaSignInAlt /> Sign In
            </NavItem>
            <NavItem to='/register'>
              <FaRegistered /> Sign Up
            </NavItem>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default NavLinks;
