import Link from "next/link";
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, VStack, Text, Box, ButtonGroup, Spacer} from '@chakra-ui/react'

const IndexPage = () => (
  <Flex height="100vh" alignItems="center" justifyContent="center">
    <VStack direction='column' spacing='24px'>
      <Card align='center' h='50vh'>
        <VStack spacing='40px'>
          <CardHeader>
            <Heading size='md' fontSize='3xl'> Welcome to Go Phish!</Heading>
          </CardHeader>
          <CardBody>
            <Text align='center' fontSize='2xl'>You might know that neural networks are smart, but how do you stack up?</Text>
            <Text align='center' fontSize='2xl'>Find out in this interactive game!</Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup gap='5'>
              <Button colorScheme='teal' size='lg'>Begin</Button>
              <Button colorScheme='teal' size='lg'>About</Button>
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

export default IndexPage;
