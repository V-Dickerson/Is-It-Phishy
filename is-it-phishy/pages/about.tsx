import { Tab, TabList, TabPanel, Tabs, Text, TabPanels, Box, Flex, Card, Heading, VStack, Button, CardHeader, Icon, CardFooter, CardBody, IconButton, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
    const router = useRouter()
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <VStack spacing='5'>
                <Heading>About the Project</Heading>
                <Card h='70vh' w='50vw'>
                    <CardHeader>
                        <Heading alignSelf='center' size='md'>Made by Vanessa Dickerson</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text fontSize='large'>
                            &nbsp;&nbsp;&nbsp;&nbsp;This game is intended to display how machine learning models work and what they look like in a way that
                            is accessible to people without technical backgrounds. For more information, you can go to the README on 
                            GitHub. This code, and the code that was used to generate the model, is all open source and accessible there.
                        </Text>
                        <br />
                        <Text fontSize='large'>
                            &nbsp;&nbsp;&nbsp;&nbsp;While the scope of this project wasn't large enough to explain the way that these models iterate and decide on
                            their predictions or the implications of those methods, I can recommend a few resources. First, 3blue1brown on
                            YouTube has a great series on neural networks and the math behind them in an accessible way.
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Link href='https://github.com/V-Dickerson/Phishing-Detector' isExternal>
                            <IconButton aria-label='Visit the GitHub' icon={<FaGithub />} />
                        </Link>
                    </CardFooter>
                </Card>
                <Button colorScheme='blue' size='lg' width='20vw' marginLeft='2vw' onClick={() => {router.push('/')}} key="back">Go back</Button>
                </VStack>
            </Flex>
    )
}
export default About;