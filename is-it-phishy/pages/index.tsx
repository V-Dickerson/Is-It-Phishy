"use client";

import Link from "next/link";
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, VStack, Text, Box, ButtonGroup, Spacer} from '@chakra-ui/react'
import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <Flex height="100vh" width='100vw' alignItems="center" alignContent='center'>
      <VStack direction='column' spacing='24px' align='center' width='100vw'>
        <Card align='center' h='60vh' w='50vh'>
          <VStack spacing='40px'>
            <CardHeader>
              <Heading size='xl' textAlign='center'> Is it Phishy?</Heading>
            </CardHeader>
            <CardBody>
              <Text align='center' fontSize='xl'>You might know that neural networks are smart, but how do you stack up?</Text>
              <Text align='center' fontSize='xl'>Find out in this interactive game!</Text>
            </CardBody>
            <CardFooter>
              <ButtonGroup gap='12'>
                <Button colorScheme='teal' size='lg' onClick={() => {router.push('/play')}}>Begin</Button>
                <Button colorScheme='teal' size='lg' onClick={() => {router.push('/about')}}>About</Button>
              </ButtonGroup>
            </CardFooter>
          </VStack>
        </Card>
        <Box ml='3'>
          <Text fontWeight='bold'>
            Made by Vanessa Dickerson
          </Text>
        </Box>
      </VStack>
    </Flex>
  );
}

export default IndexPage;
