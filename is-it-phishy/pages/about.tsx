import { Tab, TabList, TabPanel, Tabs, Text, TabPanels, Box, Flex, Card, Heading, VStack, Button, CardHeader, Icon, CardFooter, CardBody, IconButton, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
    const router = useRouter()
    return (
        <Flex height="100vh" alignItems={{sm: "center"}} justifyContent="center">
            <VStack spacing='5'>
                <Heading>About the Project</Heading>
                <Card h={{sm: '50vh', larger: '75vh'}} w={{base: '90vw', md:'50vw'}}>
                    <CardHeader alignSelf='center'>
                        <Heading alignSelf='center' size='sm'>Made by Vanessa Dickerson</Heading>
                    </CardHeader>
                    <CardBody h='60%'>
                        <Text fontSize={{sm:'1.5vh', base: '2.4vw', md: '1.1vw'}} padding='1vh'>
                            &nbsp;&nbsp;&nbsp;&nbsp;This game is intended to display how machine learning models work and what they look like in a way that
                            is accessible to people without technical backgrounds. For more information, you can go to the README on 
                            GitHub. This code, and the code that was used to generate the model, is all open source and accessible there.
                        </Text>
                        <Text fontSize={{sm:'1.5vh', base: '2.4vw', md: '1.1vw'}} padding='1vh'>
                            &nbsp;&nbsp;&nbsp;&nbsp;While the scope of this project wasn't large enough to explain the way that these models iterate and decide on
                            their predictions or the implications of those methods, I can recommend a few resources. First, 3blue1brown on
                            YouTube has a great series on neural networks and the math behind them in an accessible way.
                        </Text>
                        <Text fontSize={{sm:'1.5vh', base: '2.4vw', md: '1.1vw'}} padding='1vh'>
                            &nbsp;&nbsp;&nbsp;&nbsp; Second, I would recommend Firebase, a channel on YouTube that goes into detail on the different
                            implementations that these models have, and the technology you can use to make a project. Their channel can be a great inspiration for development.
                            Third, I would recommend looking into Kaggle.
                            I got the idea for this project browsing their open source datasets, where I found {' '} <Link href='https://www.kaggle.com/datasets/hemanthpingali/phishing-url' isExternal>this dataset</Link>.
                        </Text>
                        <Text fontSize={{sm:'1.5vh', base: '2.4vw', md: '1.1vw'}} padding='1vh'>
                            &nbsp;&nbsp;&nbsp;&nbsp; Lastly, I'd say get started! Now is as good a time as any, and the best way to learn is to do. You can try
                            doing a {' '} <Link href='https://www.kaggle.com/datasets/uciml/iris/code?datasetId=19&sortBy=voteCount' isExternal>tutorial or walkthrough</Link>.
                            Good luck and have fun!
                        </Text>
                        <Text fontSize={{sm:'1.5vh', base: '2.4vw', md: '1.1vw'}} padding='1vh'>
                            Sincerely, Vanessa.
                        </Text>
                    </CardBody>
                    <CardFooter justifyContent='right'>
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