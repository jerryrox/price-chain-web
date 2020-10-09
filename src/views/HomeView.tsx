import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { Fragment, useEffect } from "react";
import HomeViewState from "../blocs/states/HomeViewState";
import LoginState from "../blocs/states/LoginState";
import UserState from "../blocs/states/UserState";
import HomeViewBloc from "../blocs/ui/HomeViewBloc";
import FlexBox from "../components/FlexBox";
import useAuth from "../libs/useAuth";
import useBloc from "../libs/useBloc";
import UserType, { UserTypeUtils } from "../models/UserType";

export default function HomeView() {

    const bloc = useBloc(HomeViewBloc);
    const state = useBloc(HomeViewState);
    const loginState = useBloc(LoginState);
    const userState = useBloc(UserState);

    const publicAddress = useBindable(state.publicAddress);
    const privateAddress = useBindable(state.privateAddress);
    const credential = useBindable(loginState.credential);
    const userType = useBindable(userState.userType);

    const isLoggedIn = useAuth();

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onPublicAddressChange = (e: any) => bloc.setPublicAddress(e.target.value);

    const onPrivateAddressChange = (e: any) => bloc.setPrivateAddress(e.target.value);

    const onCustomerButton = () => bloc.continueAsCustomer();

    const onShopOwnerButton = () => bloc.continueAsShopOwner();

    const onWalletButton = () => bloc.toWallet();

    const onManageButton = () => bloc.toManage();

    const onLogoutButton = () => bloc.logout();

    const drawUnauthView = () => {
        return (
            <Fragment>
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
                    Continue as shop owner
                </Button>
            </Fragment>
        );
    };

    const drawAuthView = () => {
        return (
            <Fragment>
                <Typography variant="h6">Logged in as {UserTypeUtils.getDisplayed(userType)}.</Typography>
                <Typography>Address: {credential?.publicAddress ?? ""}</Typography>

                <Box height={40} />
                
                <Button variant="contained" color="primary" onClick={onWalletButton} style={{
                    maxWidth: "90%",
                    width: 400,
                }}>
                    My wallet
                </Button>
                <Box height={10} />
                {
                    userType === UserType.shopOwner &&
                    <Button variant="contained" color="primary" onClick={onManageButton} style={{
                        maxWidth: "90%",
                        width: 400,
                    }}>
                        Manage items
                    </Button>
                }
                <Box height={10}/>
                <Button variant="contained" color="secondary" onClick={onLogoutButton} style={{
                    maxWidth: "90%",
                    width: 400,
                }}>
                    Log out
                </Button>
            </Fragment>
        );
    };
    
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

                {
                    isLoggedIn &&
                    drawAuthView()
                }
                {
                    !isLoggedIn &&
                    drawUnauthView()
                }
            </Box>
        </Box>
    );
}