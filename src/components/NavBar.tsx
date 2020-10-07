import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import React, { Fragment } from "react";
import NavBarBloc from "../blocs/ui/NavBarBloc";
import Icons from "../libs/Icons";
import useBloc from "../libs/useBloc";

const navBarHeight = 64;

export default function NavBar() {

    const bloc = useBloc(NavBarBloc);

    const onMenuButton = () => bloc.openDrawer();
    
    return (
        <Fragment>
            <AppBar position="fixed" color="primary" style={{
                height: navBarHeight,
            }}>
                <Toolbar style={{
                    height: navBarHeight,
                }}>
                    <IconButton onClick={onMenuButton}>
                        <Icons.menu/>
                    </IconButton>
                    <Box flex={1} />
                </Toolbar>
            </AppBar>
            <Box height={navBarHeight} />
        </Fragment>
    );
}