import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import AppDrawerBloc from "../blocs/ui/AppDrawerBloc";
import AppDrawerState from "../blocs/states/AppDrawerState";
import useBloc from "../libs/useBloc";
import Icons from "../libs/Icons";
import useAuth from "../libs/useAuth";
import UserState from "../blocs/states/UserState";
import UserType from "../models/UserType";

export default function AppDrawer() {

    const bloc = useBloc(AppDrawerBloc);
    const state = useBloc(AppDrawerState);
    const userState = useBloc(UserState);

    const isOpen = useBindable(state.isOpen);
    const userType = useBindable(userState.userType);

    const isLoggedIn = useAuth();

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onDrawerClose = () => bloc.closeDrawer();

    const onHomeButton = () => bloc.toHome();

    const onSearchButton = () => bloc.toSearch();

    const onWalletButton = () => bloc.toWallet();

    const onManageButton = () => bloc.toManage();

    const onDebugChainButton = () => bloc.debugChain();

    const onDebugBlockButton = () => bloc.debugBlock();

    const onLogoutButton = () => bloc.logout();

    const drawListItem = (Icon: any, label: string, onClick: () => void) => {
        return (
            <ListItem button onClick={onClick}>
                <ListItemIcon><Icon /></ListItemIcon>
                <ListItemText primary={label}/>
            </ListItem>
        );
    };
    
    return (
        <Drawer open={isOpen} anchor="left" onClose={onDrawerClose}>
            <List style={{
                width: 320,
                height: "100%",
            }}>
                {drawListItem(Icons.home, "Home", onHomeButton)}
                {drawListItem(Icons.search, "Search", onSearchButton)}
                {
                    isLoggedIn &&
                    drawListItem(Icons.wallet, "Wallet", onWalletButton)
                }
                {
                    userType === UserType.shopOwner &&
                    drawListItem(Icons.manage, "Manage items", onManageButton)
                }
                {drawListItem(Icons.blockChain, "Log Blockchain Data", onDebugChainButton)}
                {drawListItem(Icons.block, "Log Block Data", onDebugBlockButton)}
            </List>
            
            <Box flex={1} />
            <Divider/>
            {drawListItem(Icons.logout, "Log out", onLogoutButton)}
        </Drawer>
    );
}