import React, { useEffect, useState } from 'react';
import { Box, Text, Flex, HStack, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { getColors } from '../../utils/constants';
import { errorToast, successToast } from '../../CommonFunctions';
import { INSTALL_METAMASK, CONNECT_METAMASK, WINNER_SELECTED, TRANSACTION_PENDING } from '../../utils/Messages';
import getEthereumContract from '../../APIs/Lottery';
import { utils } from 'ethers';
import AnimationBox from './AnimationBox';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const Home = ({ isConnected }) => {
    const toast = useToast();
    const [amount, setAmount] = useState(0);
    const [manager, setManager] = useState("");
    const [participants, setParticipants] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [isAnimation, setIsAnimation] = useState(false);
    const [address, setAddress] = useState();

    useEffect(() => {
        if (window.ethereum) {
            getContract();
        }
        else errorToast(toast, INSTALL_METAMASK);
    }, []);

    useEffect(() => {

        if (isConnected) {
            getContract();
        }
    }, [isConnected]);

    const EthAccounts = async () => {
        try {
            let accounts = await window.ethereum.request({ method: "eth_accounts" });
            return accounts;
        }
        catch (err) {
            console.error(err);
        }
    }

    const getContract = async () => {
        try {
            let accounts = await EthAccounts();
            if (accounts.length === 0) {
                errorToast(toast, CONNECT_METAMASK)
            }
            else {
                const cont = getEthereumContract();
                //cont.manager(console.log).catch(console.log);
                let _balance = await cont.getBalance();
                setAmount(Number(_balance._hex));
                setManager(await cont.manager());
                setParticipants(await cont.getParticipants());
                let accounts = await window.ethereum.request({ method: "eth_accounts" });
                setAddress(cont?.address);
                if (Number(accounts[0]) === Number(await cont.manager())) { setIsManager(true) }
                else { setIsManager(false) };
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const participate = async () => {

        setIsAnimation(true);
        let user = await window.ethereum.request({ method: "eth_accounts" });
        user = user[0];
        let params = [{
            from: user,
            to: process.env.REACT_APP_SMART_ADDRESS,
            gas: "0x17FB8",
            value: utils.parseEther("0.010002")._hex
        }];
        try {
            let response = await window.ethereum.request({ method: 'eth_sendTransaction', params });
            if (response) {

                successToast(toast, TRANSACTION_PENDING);
                setTimeout(() => { getContract(); setIsAnimation(false); }, 30000);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const getWinner = async () => {
        try {
            setIsAnimation(true);
            const contract = getEthereumContract();
            let response = await contract.getWinner();
            if (response) successToast(toast, WINNER_SELECTED);
            setIsAnimation(false);
            getContract();
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Box height={"80%"}>

                <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={["sm", "xx-large"]} color={"white"} fontWeight={"bold"}>
                        Welcome to the Ethereum Based Lottery Sytstem
                    </Text>
                    <Text fontSize={["sm", "xl"]} color={getColors("pink")} fontWeight={"bold"}>
                        Participate and win Lottery
                    </Text>
                    <Text fontSize={["xs", "md"]} color={getColors("blue")} marginTop={5}>
                        Smart Contract Addresss:{address}
                    </Text>
                </Flex>

                <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} marginTop={10}>
                    <HStack>{(!isAnimation) && ((isManager) ? <Button onClick={getWinner} p={4} width="120%">Get Winner</Button> : <Button onClick={participate}>Participate</Button>)}
                        {isAnimation && <AnimationBox />}</HStack>

                    <HStack marginTop={"10"} backgroundColor={"gray.900"} borderRadius={"xl"} width={["90%", "40%"]} justifyContent="center" p={4}>
                        <Text fontSize={["md", "xl"]} color={getColors("teal")} fontWeight={"bold"}>
                            Manager:
                        </Text>
                        <Box>
                            <Text color="white">{manager}</Text>
                        </Box>
                    </HStack>



                    <HStack backgroundColor={"gray.900"} borderRadius={"xl"} width={["90%", "40%"]} marginTop={10} justifyContent="center" p={4} overflow="hidden">
                        <Text fontSize={["md", "xl"]} color={getColors("teal")} fontWeight={"bold"}>
                            Participants:
                        </Text>
                        <Box>

                            {participants.length !== 0 ? participants?.map(participant => <Text color="white">{participant}</Text>) : <Text color="white">No Participant</Text>}
                        </Box>
                    </HStack>

                    <HStack marginTop={"10"} backgroundColor={"gray.900"} borderRadius={"xl"} width={["90%", "40%"]} justifyContent="center" p={4}>
                        <Text fontSize={["md", "xl"]} color={getColors("teal")} fontWeight={"bold"}>
                            Balance:
                        </Text>
                        <Box>
                            <Text color="white">{(parseFloat(amount) / Math.pow(10, 18)).toFixed(2)} Eth</Text>
                        </Box>
                    </HStack>


                </Flex>


            </Box>
        </>
    )
}

export default Home 