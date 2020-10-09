import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import HomeViewBloc from "../blocs/ui/HomeViewBloc";
import useBloc from "../libs/useBloc";

export default function HomeView() {

    const bloc = useBloc(HomeViewBloc);

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