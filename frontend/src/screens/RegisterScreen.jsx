import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Heading,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <VStack align='start'>
        <Heading mb='4'>Sign Up</Heading>

        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box mb='4'>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>

          <Box mb='4'>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box mb='4'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Box mb='4'>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Button
            type='submit'
            colorScheme='purple'
            mb='4'
            disabled={isLoading}
            isLoading={isLoading}
          >
            <Text>Sign Up</Text>
          </Button>
        </form>

        <Text>
          Already have an account? <Link to='/login'>Login</Link>
        </Text>
      </VStack>
    </FormContainer>
  );
};

export default RegisterScreen;
