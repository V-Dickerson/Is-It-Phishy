import { Flex, VStack, Card, CardHeader, Heading, CardBody, CardFooter, ButtonGroup, Button, Box, Text, useDisclosure, Modal, ModalHeader, ModalCloseButton, ModalBody, ModalOverlay, ModalContent, ModalFooter } from "@chakra-ui/react"
import { propagateServerField } from "next/dist/server/lib/render-server";
import { Divider } from "@chakra-ui/react"
import { useState } from "react";
import ModelVision from "../components/ModelVision";
import KeepingScore from "../components/KeepingScore";


const Play = () => {
    /*
    const [state, setState] = React.useState<State>({
        winCondition: 0,
        url: "https://www.sample-url.com",
        url_data: [],
        is_phish: false,
        usr_correct: 0,
        model_correct: 0,
        total_rounds: 0,
        is_open: false
    });
    */
    const [winCondition, setWinCondition] = useState(0);
    const [url, setUrl] = useState("https://www.sample-url.com");
    const [url_data, setUrlData] = useState(["Sample data 1", "Sample data 2", "Sample data 3"]);
    const [is_phish, setIsPhish] = useState(false);
    const [usr_correct, setUsrCorrect] = useState(0);
    const [model_correct, setModelCorrect] = useState(0);
    const [total_rounds, setTotalRounds] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <VStack direction='column' spacing='24px'>
                <Card align='center' minHeight='60vh' minWidth='50vh'>
                    <VStack spacing='3vh' align='center'>
                        <CardHeader alignItems='center'>
                            <Heading size='lg' textAlign='center'> URL: </Heading>
                            <Text align='center' fontSize='med' padding='1vh'>{url}</Text>
                            <Divider minWidth='200px' />
                        </CardHeader>
                        <Button size='lg' textAlign='center' alignSelf='center' width='20vw' minWidth='200px' onClick={onOpen}>Model View...</Button>

                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Model View</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text align='center'>This is what the model sees!</Text>
                                    <ModelVision data={url_data} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='blue' onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>


                    </VStack>
                    <CardFooter marginTop='20vh'>
                        <ButtonGroup gap='5' width='inherit'>
                            <Button colorScheme='green' size='lg' width='20vw' marginLeft='2vw'>Legit!</Button>
                            <Button colorScheme='red' size='lg' width='20vw' marginRight='2vw'>Go Phish!</Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <KeepingScore model_correct={model_correct} usr_correct={usr_correct} total_rounds={total_rounds}/>
                <Box ml='3'>
                    <Text fontWeight='bold'>
                        Made by Vanessa Dickerson
                    </Text>
                </Box>
            </VStack>
        </Flex>
    );
}

export default Play;