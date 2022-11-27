import {
    Box,
    Flex,
    HStack,
    Button,
    Image,
    Text
} from '@chakra-ui/react';
import Logo from "../../Assets/etherpink.png";
import Metamask from "../../Assets/Fox.png";
import { getColors } from "../../utils/constants";


export default function Header({ setIsConnected }) {

    const connectMetamask = async () => {
        try {
            setIsConnected(false);
            const { ethereum } = window;
            let response = await ethereum.request({ method: "eth_requestAccounts" });
            if (response.length !== 0) {
                setIsConnected(true);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Box bg={getColors("black")} px={4} color={"white"} borderBottom={"1px"} borderColor={"gray.800"} py={2}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={2} alignItems={'center'}>
                        <Box><Image src={Logo} boxSize='50px'
                            objectFit='cover' /></Box>
                        <Box><Text color={"white"} fontWeight="bold" fontSize={["md", "xl"]}>Eth Lottery</Text></Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={getColors("teal")}
                            rounded="xl"
                            size={'md'}
                            mr={4}
                            onClick={connectMetamask}
                        >
                            Connect <Image src={Metamask} boxSize="50px" />
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}