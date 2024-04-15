import { Text } from "@chakra-ui/react"
export default function ModelVision(props) {
    const data = props.data.map(item => <Text>{item}</Text>)
    return (
        <div>
            <p>{data}</p>
        </div>
    )
}