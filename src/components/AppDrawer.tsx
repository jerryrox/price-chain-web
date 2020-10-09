import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import AppDrawerBloc from "../blocs/ui/AppDrawerBloc";
import AppDrawerState from "../blocs/states/AppDrawerState";
import useBloc from "../libs/useBloc";
import Icons from "../libs/Icons";

export default function AppDrawer() {

    const bloc = useBloc(AppDrawerBloc);
    const state = useBloc(AppDrawerState);

    const isOpen = useBindable(state.isOpen);

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onDrawerClose = () => bloc.closeDrawer();

    const onHomeButton = () => bloc.toHome();

    const onLogoutButton = () => bloc.logout();
    
    return (
        <Drawer open={isOpen} anchor="left" onClose={onDrawerClose}>
            <List style={{
                width: 320,
                height: "100vh",
            }}>
                <ListItem button onClick={onHomeButton}>
                    <ListItemIcon><Icons.home /></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
            </List>
            
            <Box flex={1} />
            <Divider/>
            <ListItem button onClick={onLogoutButton}>
                <ListItemIcon><Icons.logout /></ListItemIcon>
                <ListItemText primary="Log out"/>
            </ListItem>
        </Drawer>
    );
}