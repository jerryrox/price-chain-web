import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import HomeViewState from "../blocs/states/HomeViewState";
import HomeViewBloc from "../blocs/ui/HomeViewBloc";
import FlexBox from "../components/FlexBox";
import useBloc from "../libs/useBloc";

export default function HomeView() {

    const bloc = useBloc(HomeViewBloc);
    const state = useBloc(HomeViewState);

    const publicAddress = useBindable(state.publicAddress);
    const privateAddress = useBindable(state.privateAddress);

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onPublicAddressChange = (e: any) => bloc.setPublicAddress(e.target.value);

    const onPrivateAddressChange = (e: any) => bloc.setPrivateAddress(e.target.value);

    const onCustomerButton = () => bloc.continueAsCustomer();

    const onShopOwnerButton = () => bloc.continueAsShopOwner();
    
    return (
        <Box>
            <Box style={{
                boxSizing: "border-box",
                marginTop: "8rem",
                marginBottom: "8rem",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
            }}>
                <Typography variant="h4">
                    Price Chain
                </Typography>

                <Box height={100} />

                <FlexBox alignItems="center" flexDirection="row">
                    <Typography>Public address</Typography>
                    <Box width={20}/>
                    <TextField value={publicAddress} onChange={onPublicAddressChange}/>
                </FlexBox>
                <FlexBox alignItems="center" flexDirection="row">
                    <Typography>Private address</Typography>
                    <Box width={20}/>
                    <TextField value={privateAddress} onChange={onPrivateAddressChange}/>
                </FlexBox>
                <Box height={20}/>
                
                <Box height={40}/>

                <Button variant="contained" color="primary" onClick={onCustomerButton} style={{
                    maxWidth: "90%",
                    width: 400,
                }}>
                    Continue as customer
                </Button>
                <Box height={10} />
                <Typography variant="h6">
                    - OR -
                </Typography>
                <Box height={10}/>
                <Button variant="contained" color="primary" onClick={onShopOwnerButton} style={{
                    maxWidth: "90%",
                    width: 400,
                }}>
                    Continue as business owner
                </Button>
            </Box>
        </Box>
    );
}