import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";


export default function KeepingScore(props) {
    return (
        <Card align='center' minWidth='50vh'>
            <CardHeader>
                <Heading size='lg'>Scores</Heading>
            </CardHeader>
            <CardBody>
                <Text>Computer: {props.model_correct}/{props.total_rounds}</Text>
                <Text>Human: {props.usr_correct}/{props.total_rounds}</Text>
            </CardBody>
        </Card>
    )
}