import { Container, Card, Button } from 'react-bootstrap';
import { useGetUserQuery } from '../slices/usersApiSlice';

const Hero = () => {
  const { data, isLoading } = useGetUserQuery();

  const userData = JSON.stringify(data);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>MERN Authentication</h1>
          <p className='text-center mb-4'>
            This is a boilerplate for MERN authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
        </Card>
      </Container>
      {isLoading && <span>LOADING</span>}
      <span>{userData}</span>
    </div>
  );
};

export default Hero;
