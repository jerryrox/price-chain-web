import { Box, Button, Container, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import WalletViewState from "../blocs/states/WalletViewState";
import LoginState from "../blocs/states/LoginState";
import WalletViewBloc from "../blocs/ui/WalletViewBloc";
import FlexBox from "../components/FlexBox";
import TitleHeader from "../components/TitleHeader";
import useBloc from "../libs/useBloc";
import BalanceState from "../blocs/states/BalanceState";

export default function WalletView() {

    const state = useBloc(WalletViewState);
    const bloc = useBloc(WalletViewBloc);
    const loginState = useBloc(LoginState);
    const balanceState = useBloc(BalanceState);

    const amount = useBindable(state.amount);
    const address = useBindable(state.address);
    const credential = useBindable(loginState.credential);
    const balance = useBindable(balanceState.balance);

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onTokenAmountChange = (e: any) => bloc.setAmount(e.target.value);

    const onAddressChange = (e: any) => bloc.setAddress(e.target.value);

    const onSendButton = () => bloc.sendTokens();
    
    return (
        <Box>
            <Container style={{
                width: "100%",
            }}>
                <TitleHeader title="Your Wallet" />

                <Typography variant="h5">Public address</Typography>
                <Typography>{credential?.publicAddress ?? ""}</Typography>

                <Box height={20} />
                
                <Typography variant="h5">Balance</Typography>
                <Typography>{balance}</Typography>

                <Box height={20} />
                
                <Typography variant="h5">Send tokens</Typography>
                <FlexBox flexDirection="row" alignItems="center">
                    <Typography>Amount</Typography>
                    <Box width={10}/>
                    <TextField value={amount} onChange={onTokenAmountChange} />
                </FlexBox>
                <Box height={5}/>
                <FlexBox flexDirection="row" alignItems="center">
                    <Typography>Address</Typography>
                    <Box width={10}/>
                    <TextField value={address} onChange={onAddressChange} />
                </FlexBox>
                <Box height={10}/>
                <Button variant="contained" onClick={onSendButton} color="primary">
                    Send
                </Button>
                <Box height={20}/>
            </Container>
        </Box>
    );
}