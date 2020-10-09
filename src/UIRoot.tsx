import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";
import NavigationServicer from "./servicers/NavigationServicer";
import WalletView from "./views/WalletView";
import NotificationServicer from "./servicers/NotificationServicer";
import BlockchainOverlay from "./overlays/BlockchainOverlay";
import BlockOverlay from "./overlays/BlockOverlay";

export default function UIRoot() {
    
    return (
        <Box>
            <BrowserRouter>
                <NavigationServicer/>
                <NotificationServicer/>

                <NavBar />

                <Switch>
                    <Route exact path="/">
                        <HomeView/>
                    </Route>
                    <Route path="/login">

                    </Route>
                    <Route path="/wallet">
                        <WalletView/>
                    </Route>
                </Switch>

                <BlockchainOverlay />
                <BlockOverlay/>

                <AppDrawer/>
            </BrowserRouter>
        </Box>
    );
}