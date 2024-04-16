import { Text } from "@chakra-ui/react"
export default function ModelVision(props) {
    return (
        <div>
            <Text>{props.data.url_data}</Text>
        </div>
    )
}