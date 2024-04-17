import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";


export default function KeepingScore(props) {
    return (
        <Card align='center' minWidth='50vh'>
            <CardHeader>
                <Heading size='lg'>Scores</Heading>
            </CardHeader>
            <CardBody>
                {props.model_correct > props.usr_correct &&
                    <Text as='b'>The neural network is winning!</Text>
                }
                {props.model_correct < props.usr_correct &&
                    <Text as='b'>You're beating the neural network!</Text>
                }
                {props.model_correct == props.usr_correct &&
                    <Text as='b'>You're tied with the neural network!</Text>
                }

                <Text align='center'>Computer: {props.model_correct}/{props.total_rounds}</Text>
                <Text align='center'>Human: {props.usr_correct}/{props.total_rounds}</Text>
            </CardBody>
        </Card>
    )
}