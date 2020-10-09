import { Box, Button, IconButton, List, ListItem, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import ManageViewState from "../blocs/states/ManageViewState";
import ManageViewBloc from "../blocs/ui/ManageViewBloc";
import FlexBox from "../components/FlexBox";
import TitleHeader from "../components/TitleHeader";
import Icons from "../libs/Icons";
import useBloc from "../libs/useBloc";
import Utils from "../libs/Utils";

export default function ManageView() {

    const bloc = useBloc(ManageViewBloc);
    const state = useBloc(ManageViewState);

    const items = useBindable(state.items);

    const onNewItemButton = () => bloc.createNewItem();

    const onReloadButton = () => bloc.loadItems();

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line
    
    return (
        <Box>
            <TitleHeader
                title="Manage items"
            />
            <FlexBox flexDirection="row" alignItems="center">
                <Button color="primary" variant="contained" onClick={onNewItemButton}>
                    New item
                </Button>
                <Box width={5}/>
                <Button color="primary" variant="contained" onClick={onReloadButton}>
                    Reload items
                </Button>
            </FlexBox>
            <Box height={10} />
            <List>
                {
                    items.map((item) => {
                        const finalPrice = item.basePrice * (1 - item.discountRate);
                        const onEditButton = () => {
                            bloc.editItem(item);
                        };

                        return (
                            <ListItem key={item.sku} divider>
                                <FlexBox flexDirection="column" alignItems="flex-start">
                                    <Typography variant="h6">
                                        {item.sku}
                                    </Typography>
                                    <Typography>
                                        {`Base price: $${item.basePrice} | Discount: ${Utils.getPercent(item.discountRate)} | Final price: $${finalPrice}`}
                                    </Typography>
                                </FlexBox>
                                <Box flex={1} />
                                <IconButton onClick={onEditButton}>
                                    <Icons.edit />
                                </IconButton>
                            </ListItem>
                        );
                    })
                }
            </List>
        </Box>
    );
}