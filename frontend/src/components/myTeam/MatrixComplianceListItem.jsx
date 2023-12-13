import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Heading,
  Progress,
} from '@chakra-ui/react';
import React from 'react';

const MatrixComplianceListItem = ({ userSkills, matrix }) => {
  return (
    <Card flexDir='row' variant='outline' flexWrap='wrap'>
      <CardHeader display='flex' alignItems='center' maxW='300px'>
        <Heading size='sm'>{matrix.name}</Heading>
      </CardHeader>
      <CardBody display='flex' alignItems='center'>
        <Progress flex='1' hasStripe isIndeterminate colorScheme='green' />
      </CardBody>
      <CardFooter>some actions</CardFooter>
    </Card>
  );
};

export default MatrixComplianceListItem;
