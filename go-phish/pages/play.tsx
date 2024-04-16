import { Flex, VStack, Card, CardHeader, Heading, CardBody, CardFooter, ButtonGroup, Button, Box, Text, useDisclosure, Modal, ModalHeader, ModalCloseButton, ModalBody, ModalOverlay, ModalContent, ModalFooter, TableContainer, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { propagateServerField } from "next/dist/server/lib/render-server";
import { Divider } from "@chakra-ui/react"
import { useEffect, useState } from "react";
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
    const [usr_correct, setUsrCorrect] = useState(0); // maybe not necessary, same w/ model_correct
    const [model_correct, setModelCorrect] = useState(0);
    const [total_rounds, setTotalRounds] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [data, setData] = useState({
        url: "",
        url_data: [],
        model_answer: -1,
        model_confidence: -1,
        answer: -1,
    });

    useEffect(() => {
        fetch('/api/get-question').then((res) =>
        res.json().then((data) => {
            setData({
                url: data.url,
                url_data: data.url_data,
                model_answer: data.model_answer,
                model_confidence: data.model_confidence,
                answer: data.answer
            });
        }))
    }, []);

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <VStack direction='column' spacing='24px'>
                <Card align='center' minHeight='60vh' minWidth='50vh'>
                    <VStack spacing='3vh' align='center'>
                        <CardHeader alignItems='center'>
                            <Heading size='lg' textAlign='center'> URL: </Heading>
                            <Text align='center' fontSize='med' padding='1vh'>{data.url}</Text>
                            <Divider minWidth='200px' />
                        </CardHeader>
                        <Button size='lg' textAlign='center' alignSelf='center' width='20vw' minWidth='200px' onClick={onOpen}>Model View...</Button>

                        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Model View</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text align='center'>This is what the model sees!</Text>
                                    <Divider padding='1vh' />
                                    <TableContainer>
                                        <Table size='sm' variant='simple' alignSelf='center'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Descriptor</Th>
                                                    <Th>Value</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                            {
                                                data.url_data.map(it => 
                                                    <Tr>
                                                        <Td>{it[0]}</Td>
                                                        <Td>{it[1]}</Td>
                                                    </Tr>
                                                )
                                            }
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
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