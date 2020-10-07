import { Box } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeView from "./views/HomeView";
import NavBar from "./components/NavBar";
import AppDrawer from "./components/AppDrawer";

export default function UIRoot() {
    
    return (
        <Box>
            <NavBar />
            
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <HomeView/>
                    </Route>
                    <Route path="/login">
                    
                    </Route>
                </Switch>
            </BrowserRouter>

            <AppDrawer/>
        </Box>
    );
}