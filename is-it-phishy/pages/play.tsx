import {
    Flex,
    VStack,
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    ButtonGroup,
    Button,
    Box,
    Text,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    TableContainer,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Container,
    Center,
    Skeleton,
} from "@chakra-ui/react";
import { propagateServerField } from "next/dist/server/lib/render-server";
import { Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import KeepingScore from "../components/KeepingScore";
import { useRouter } from "next/router";

type URLData = {
    url: string,
    url_data: any,
    model_answer: number | null,
    model_confidence: number | null,
    answer: number,
}

const Play = () => {
    // basic hooks for tracking state on the page
    const [usr_correct, setUsrCorrect] = useState(0);
    const [model_correct, setModelCorrect] = useState(0);
    const [total_rounds, setTotalRounds] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [asking_question, setAskingQuestion] = useState(true);
    const router = useRouter();

    const [isLoaded, setIsLoaded] = useState(false);



    const [data, setData] = useState<URLData>({
        url: "",
        url_data: {},
        model_answer: -1,
        model_confidence: -1,
        answer: -1,
    });

    // handle app behavior on load
    function handleAnswer(response) {
        console.log("handleAnswer called");
        setTotalRounds(total_rounds + 1);
        if (response == data.answer) {
            setUsrCorrect(usr_correct + 1);
        }
        if (data.model_answer == data.answer) {
            setModelCorrect(model_correct + 1);
        }
        setAskingQuestion(!asking_question);
    }

    // fetch call to the question, tracks whether question is loaded
    function getQuestion() {
        
        setIsLoaded(false);
        data.url = "";
        data.url_data = {};
        data.model_answer = -1;
        data.model_confidence = -1;
        data.answer = -1;
        fetch('/api/getUrl').then((res) => {
            res.json().then((data) => {
                            setData({
                                url: data.url,
                                url_data: data.url_data,
                                model_answer: data.model_answer,
                                model_confidence: data.model_confidence,
                                answer: data.answer,
                            });
                        })
            
        }).catch((err) => console.log((err as Error).toString()))
        // fetch("https://lambishere.pythonanywhere.com/api/get-question").then(
        //     (res) =>
        //         res.json().then((data) => {
        //             setData({
        //                 url: data.url,
        //                 url_data: data.url_data,
        //                 model_answer: data.model_answer,
        //                 model_confidence: data.model_confidence,
        //                 answer: data.answer,
        //             });
        //         })
        // );
        setIsLoaded(true);
    }

    // loads question on open
    useEffect(() => {
        if (data.model_answer == -1) {
            console.log("on load react hook");
            getQuestion();
        }
    }, []);

    // play page
    function playScreen() {
        return (
            <Card align="center" w={{ base: "sm", md: "lg" }} h="md" maxH="md">
                <CardHeader alignItems="center">
                    <Heading size="lg" textAlign="center">
                        {" "}
                        URL:{" "}
                    </Heading>
                    <Skeleton isLoaded={isLoaded}>
                        <Text
                            align="center"
                            fontSize="med"
                            padding="1vh"
                            maxW="lg"
                            wordBreak="break-word"
                        >
                            {data.url}
                        </Text>
                    </Skeleton>
                    <Divider minWidth="200px" />
                </CardHeader>
                <CardBody>
                    <Button
                        size="lg"
                        textAlign="center"
                        alignSelf="center"
                        width="20vw"
                        minWidth="200px"
                        onClick={onOpen}
                    >
                        Model View...
                    </Button>
                </CardBody>

                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    scrollBehavior="inside"
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Model View</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text align="center">
                                This is what the model sees!
                            </Text>
                            <Divider padding="1vh" />
                            <Skeleton isLoaded={isLoaded}>
                                <TableContainer>
                                    <Table
                                        size="sm"
                                        variant="simple"
                                        alignSelf="center"
                                    >
                                        <Thead>
                                            <Tr>
                                                <Th>Descriptor</Th>
                                                <Th>Value</Th>
                                            </Tr>
                                        </Thead>

                                        <Tbody>
                                            {Object.entries(data?.url_data ?? {}).map(([key, value]) => (
                                                <Tr key={key}>
                                                    <Td>{key}</Td>
                                                    <Td>{value}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Skeleton>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                <CardFooter>
                    <ButtonGroup gap="5" maxW="lg">
                        <Button
                            colorScheme="green"
                            size="lg"
                            marginLeft="2vw"
                            onClick={() => handleAnswer(false)}
                        >
                            Legit!
                        </Button>
                        <Button
                            colorScheme="red"
                            size="lg"
                            marginRight="2vw"
                            onClick={() => handleAnswer(true)}
                        >
                            Phishy!
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        );
    }

    // answer page
    function answerScreen() {
        return (
            <Card align="center" w={{ base: "sm", md: "lg" }} h="md" maxH="md">
                <CardHeader alignItems="center">
                    <Heading size="lg" textAlign="center">
                        {" "}
                        The correct answer was:{" "}
                    </Heading>
                    <Skeleton isLoaded={isLoaded}>
                        <Heading size="md" textAlign="center" padding="1vh">
                            {data.answer == 1 && "Phishy!"}
                            {data.answer == 0 && "Legit!"}
                        </Heading>
                    </Skeleton>
                    <Divider minWidth="200px" />
                </CardHeader>
                <CardBody>
                    <Text align="center" fontSize="med" padding="1vh">
                        The computer guessed:{" "}
                    </Text>
                    <Skeleton isLoaded={isLoaded}>
                        <Text align="center" fontSize="med" padding="1vh">
                            {data.model_answer == 1 && "Phishing"}
                            {data.model_answer == 0 && "Legit"}
                        </Text>
                    </Skeleton>
                    <Text align="center" fontSize="med" padding="1vh">
                        With a confidence level of:{" "}
                    </Text>
                    <Skeleton isLoaded={isLoaded}>
                        <Text align="center" fontSize="med" padding="1vh">
                            {(data.model_confidence*100).toFixed(2)}%
                        </Text>
                    </Skeleton>
                </CardBody>
                <CardFooter minHeight='fit-content'>
                    <ButtonGroup gap="5" maxW="lg" marginBottom='1vh'>
                        <Button
                            colorScheme="blue"
                            size="lg"
                            width="20vw"
                            marginLeft="2vw"
                            onClick={() => {
                                router.push("/");
                            }}
                            key="restart"
                        >
                            Restart
                        </Button>
                        <Button
                            colorScheme="blue"
                            size="lg"
                            width="20vw"
                            marginRight="2vw"
                            onClick={() => {
                                getQuestion();
                                setAskingQuestion(!asking_question);
                            }}
                            key="continue"
                        >
                            Continue
                        </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Center height="100vh">
            <Flex height="100vh" width="100vw" alignItems="center">
                <VStack
                    direction="column"
                    spacing="24px"
                    alignItems="center"
                    width="100vw"
                >
                    {asking_question && playScreen()}
                    {!asking_question && answerScreen()}
                    <KeepingScore
                        model_correct={model_correct}
                        usr_correct={usr_correct}
                        total_rounds={total_rounds}
                    />
                </VStack>
            </Flex>
        </Center>
    );
};

export default Play;

function useRemoteData(): { data: any; loading: any; error: any } {
    throw new Error("Function not implemented.");
}
