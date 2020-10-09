import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";
import NavigationServicer from "./components/NavigationServicer";
import WalletView from "./views/WalletView";

export default function UIRoot() {
    
    return (
        <Box>
            <BrowserRouter>
                <NavigationServicer />

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

                <AppDrawer/>
            </BrowserRouter>
        </Box>
    );
}