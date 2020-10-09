import { Box, Button, Container, Divider, List, ListItem, TextField, Typography } from "@material-ui/core";
import { useBindable } from "bindable-bloc";
import React, { useEffect } from "react";
import SearchViewState from "../blocs/states/SearchViewState";
import SearchViewBloc from "../blocs/ui/SearchViewBloc";
import FlexBox from "../components/FlexBox";
import TitleHeader from "../components/TitleHeader";
import useBloc from "../libs/useBloc";
import Utils from "../libs/Utils";

export default function SearchView() {

    const bloc = useBloc(SearchViewBloc);
    const state = useBloc(SearchViewState);

    const searchValue = useBindable(state.searchValue);
    const results = useBindable(state.results);

    useEffect(() => {
        bloc.initState();
    }, []); // eslint-disable-line

    const onSearchValueChange = (e: any) => bloc.setSearchValue(e.target.value);

    const onSearchButton = () => bloc.search();
    
    return (
        <Box>
            <TitleHeader
                title="Search prices"
            />
            <Container>
                <FlexBox flexDirection="row" alignItems="center">
                    <TextField
                        fullWidth
                        value={searchValue}
                        onChange={onSearchValueChange}
                        placeholder="Enter SKU value"
                    />
                    <Box width={10} />
                    <Button onClick={onSearchButton}>
                        Search
                    </Button>
                </FlexBox>
                <Box height={20} />
                <List>
                    {
                        results.map((r) => {
                            const finalPrice = r.basePrice * (1 - r.discountRate);
                            const onHistoryButton = () => bloc.showHistory(r);

                            return (
                                <ListItem>
                                    <FlexBox flexDirection="column" alignItems="flex-start">
                                        <Typography variant="h6">{r.sku}</Typography>
                                        <Typography>By {r.userAddress} on {new Date(r.timestamp).toISOString()}</Typography>
                                    </FlexBox>
                                    <Box flex={1} />
                                    <FlexBox flexDirection="column" alignItems="flex-start">
                                        <Typography variant="h6">${finalPrice}</Typography>
                                        <Typography>({Utils.getPercent(r.discountRate)} discount from ${r.basePrice})</Typography>
                                    </FlexBox>
                                    <Divider orientation="vertical"/>
                                    <Button onClick={onHistoryButton}>
                                        History
                                    </Button>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Container>
        </Box>
    );
}